import { useEffect, useState } from 'react';
import { getTopReviewers, getTopSharers } from '../services/adminRequestsService';

function RankingTable({ title, description, rows, totalKey, totalLabel }) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
      <header className="border-b border-slate-700 bg-slate-800/70 p-6">
        <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      </header>

      {rows.length === 0 ? (
        <p className="p-8 text-center text-slate-400">No hay actividad suficiente para generar este reporte.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700 text-left text-sm">
            <thead className="bg-slate-800 text-xs uppercase tracking-wider text-slate-300">
              <tr>
                <th className="px-5 py-4">Posición</th>
                <th className="px-5 py-4">Usuario</th>
                <th className="px-5 py-4 text-right">{totalLabel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {rows.map((row, index) => (
                <tr key={row.id} className="transition-colors hover:bg-slate-800/60">
                  <td className="px-5 py-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/15 font-bold text-indigo-300">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-100">{row.nombre}</p>
                    <p className="mt-1 text-slate-400">{row.correo}</p>
                  </td>
                  <td className="px-5 py-4 text-right text-2xl font-bold text-slate-100">
                    {row[totalKey]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}

export default function AdminReports() {
  const [topReviewers, setTopReviewers] = useState([]);
  const [topSharers, setTopSharers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadReports = async () => {
      try {
        const [reviewers, sharers] = await Promise.all([
          getTopReviewers(),
          getTopSharers()
        ]);

        if (active) {
          setTopReviewers(reviewers);
          setTopSharers(sharers);
          setError('');
        }
      } catch (requestError) {
        console.error(requestError);

        if (active) {
          setError('No fue posible generar los reportes administrativos.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadReports();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl py-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
          Administración
        </p>
        <h1 className="text-3xl font-bold text-slate-100">Reportes Top 5</h1>
        <p className="mt-2 text-slate-400">
          Identifica a los usuarios con mayor actividad dentro de CineCraft.
        </p>
      </header>

      {loading && (
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-8 text-center text-slate-300">
          Generando reportes...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-700 bg-red-950/60 p-5 text-red-200" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-8 xl:grid-cols-2">
          <RankingTable
            title="Usuarios con más reseñas"
            description="Clasificación por cantidad total de reseñas creadas."
            rows={topReviewers}
            totalKey="total_resenas"
            totalLabel="Reseñas"
          />
          <RankingTable
            title="Usuarios que más comparten"
            description="Clasificación por cantidad total de reseñas enviadas a otros usuarios."
            rows={topSharers}
            totalKey="total_compartidas"
            totalLabel="Compartidas"
          />
        </div>
      )}
    </section>
  );
}
