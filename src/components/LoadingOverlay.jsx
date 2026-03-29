import "../styles/LoadingOverlay.css";

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Cargando...</p>
    </div>
  );
};

export default LoadingOverlay;