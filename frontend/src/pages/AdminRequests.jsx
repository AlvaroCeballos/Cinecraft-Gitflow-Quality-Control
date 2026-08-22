import { useState, useEffect } from 'react';
import { getPendingRequests, acceptRequest, rejectRequest } from '../services/adminRequestsService';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getPendingRequests();
      setRequests(data);
    } catch {
      setError('Error al cargar las solicitudes pendientes.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de APROBAR a ${nombre}?`)) {
      try {
        await acceptRequest(id);
        alert('Usuario aprobado y notificado por correo.');
        fetchRequests(); // Recargar lista
      } catch {
        alert('Hubo un error al aprobar la solicitud.');
      }
    }
  };

  const handleReject = async (id, nombre) => {
    const motivo = window.prompt(`¿Motivo de rechazo para ${nombre}? (Opcional)`);
    // Si el usuario cancela el prompt, retorna null, detenemos la ejecución
    if (motivo === null) return; 

    if (window.confirm(`¿Estás seguro de RECHAZAR a ${nombre}?`)) {
      try {
        await rejectRequest(id, motivo);
        alert('Usuario rechazado y notificado por correo.');
        fetchRequests(); // Recargar lista
      } catch {
        alert('Hubo un error al rechazar la solicitud.');
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-600">Cargando solicitudes...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Solicitudes de Registro Pendientes</h1>
      
      {requests.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No hay solicitudes pendientes en este momento.
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-700">Nombre</th>
                <th className="p-4 font-semibold text-gray-700">Correo Electrónico</th>
                <th className="p-4 font-semibold text-gray-700">Fecha de Solicitud</th>
                <th className="p-4 font-semibold text-gray-700 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-gray-800">{req.nombre}</td>
                  <td className="p-4 text-gray-600">{req.correo}</td>
                  <td className="p-4 text-gray-500">
                    {new Date(req.fecha_solicitud).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button 
                      onClick={() => handleAccept(req.id, req.nombre)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded transition-colors"
                    >
                      Aceptar
                    </button>
                    <button 
                      onClick={() => handleReject(req.id, req.nombre)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded transition-colors"
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
