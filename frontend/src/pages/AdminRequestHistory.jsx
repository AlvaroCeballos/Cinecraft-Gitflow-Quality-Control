import { useEffect, useState } from 'react';
import { getRequestHistory } from '../services/adminRequestsService';

const formatDate = (value) => {
  if (!value) return 'Sin fecha';

  return new Intl.DateTimeFormat('es-GT', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
};

const statusStyles = {
  aprobado: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  rechazado: 'border-red-500/40 bg-red-500/10 text-red-300'
};

export default function AdminRequestHistory() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadHistory = async () => {
      try {
        const data = await getRequestHistory();

        if (active) {
          setRequests(data);
          setError('');
        }
      } catch (requestError) {
        console.error(requestError);

        if (active) {
          setError('No fue posible cargar el historial de solicitudes.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadHistory();

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
        <h1 className="text-3xl font-bold text-slate-100">Historial de solicitudes</h1>
        <p className="mt-2 text-slate-400">
          Consulta las solicitudes de registro aprobadas y rechazadas por el equipo administrador.
        </p>
      </header>

      {loading && (
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-8 text-center text-slate-300">
          Cargando historial...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-700 bg-red-950/60 p-5 text-red-200" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && requests.length === 0 && (
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-8 text-center text-slate-400">
          Todavía no hay solicitudes resueltas.
        </div>
      )}

      {!loading && !error && requests.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
          <table className="min-w-full divide-y divide-slate-700 text-left text-sm">
            <thead className="bg-slate-800 text-xs uppercase tracking-wider text-slate-300">
              <tr>
                <th className="px-5 py-4">Usuario</th>
                <th className="px-5 py-4">Solicitud</th>
                <th className="px-5 py-4">Resolución</th>
                <th className="px-5 py-4">Estado</th>
                <th className="px-5 py-4">Motivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {requests.map((request) => (
                <tr key={request.id} className="transition-colors hover:bg-slate-800/60">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-100">{request.nombre}</p>
                    <p className="mt-1 text-slate-400">{request.correo}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-300">
                    {formatDate(request.fecha_solicitud)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-300">
                    {formatDate(request.fecha_resolucion)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusStyles[request.estado_solicitud]}`}
                    >
                      {request.estado_solicitud}
                    </span>
                  </td>
                  <td className="max-w-xs px-5 py-4 text-slate-400">
                    {request.motivo_rechazo || 'No aplica'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
