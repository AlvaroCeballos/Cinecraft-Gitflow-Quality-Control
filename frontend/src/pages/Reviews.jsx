import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewCard from '../components/reviewCard';
import ReviewForm from '../components/reviewForm';
import DeleteConfirmationModal from '../components/deleteConfirmationModal';
import * as reviewService from '../services/reviewService';

export default function Reviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Cargar reseñas y etiquetas al montar
  useEffect(() => {
    loadReviews();
    loadTags();
  }, []);

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const response = await reviewService.getMyReviews();
      setReviews(response.data);
      setMessage({ type: '', text: '' });
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setMessage({
          type: 'error',
          text: error.response?.data?.message || 'Error al cargar reseñas'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const response = await reviewService.getAllTags();
      setTags(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateReview = async (formData) => {
    try {
      setIsLoading(true);
      await reviewService.createReview(formData);
      setMessage({
        type: 'success',
        text: 'Reseña creada exitosamente'
      });
      loadReviews();
      loadTags();
    } catch (error) {
      console.error(error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al crear reseña'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateReview = async (formData) => {
    if (!editingReview) return;

    try {
      setIsLoading(true);
      await reviewService.updateReview(editingReview.id, formData);
      setMessage({
        type: 'success',
        text: 'Reseña actualizada exitosamente'
      });
      setEditingReview(null);
      loadReviews();
      loadTags();
    } catch (error) {
      console.error(error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al actualizar reseña'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;

    try {
      setIsLoading(true);
      await reviewService.deleteReview(reviewToDelete.id);
      setMessage({
        type: 'success',
        text: 'Reseña eliminada exitosamente'
      });
      setDeleteModalOpen(false);
      setReviewToDelete(null);
      loadReviews();
    } catch (error) {
      console.error(error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error al eliminar reseña'
      });
      setDeleteModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteModal = (reviewId) => {
    const review = reviews.find((r) => r.id === reviewId);
    setReviewToDelete(review);
    setDeleteModalOpen(true);
  };

  const handleEditClick = (review) => {
    setEditingReview(review);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
  };

  return (
    <div className="py-8">
      {/* Mensajes */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded ${
            message.type === 'success'
              ? 'bg-green-900 border border-green-700 text-green-200'
              : 'bg-red-900 border border-red-700 text-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Formulario */}
      <ReviewForm
        initialData={editingReview}
        tags={tags}
        onSubmit={editingReview ? handleUpdateReview : handleCreateReview}
        onCancel={handleCancelEdit}
        isLoading={isLoading}
      />

      {/* Listado de reseñas */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-6">
          Mis Reseñas {reviews.length > 0 && `(${reviews.length})`}
        </h2>

        {reviews.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
            <p className="text-slate-400 text-lg">
              {isLoading ? 'Cargando reseñas...' : 'Aún no tienes reseñas. ¡Crea tu primera reseña!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onEdit={handleEditClick}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        reviewTitle={reviewToDelete?.titulo_pelicula}
        onConfirm={handleDeleteReview}
        onCancel={() => {
          setDeleteModalOpen(false);
          setReviewToDelete(null);
        }}
        isLoading={isLoading}
      />
    </div>
  );
}