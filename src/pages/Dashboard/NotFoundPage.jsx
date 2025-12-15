import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Oops! Page Not Found</h2>
        <p className="notfound-text">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <button className="notfound-btn" onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>

      <div className="notfound-animation">
        <div className="floating-circle circle1"></div>
        <div className="floating-circle circle2"></div>
        <div className="floating-circle circle3"></div>
      </div>

      <style>{`
        .notfound-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #ff6ec4, #7873f5);
          color: #fff;
          font-family: 'Poppins', sans-serif;
          overflow: hidden;
          padding: 20px;
        }

        .notfound-title {
          font-size: 12rem;
          font-weight: 900;
          margin: 0;
          animation: pop 1.2s ease-in-out infinite alternate;
        }

        .notfound-subtitle {
          font-size: 2rem;
          margin: 10px 0 20px;
          color: rgba(255,255,255,0.9);
          animation: fadeInUp 1.5s ease forwards;
        }

        .notfound-text {
          font-size: 1.2rem;
          margin-bottom: 30px;
          max-width: 500px;
          line-height: 1.6;
          color: rgba(255,255,255,0.85);
          animation: fadeInUp 1.8s ease forwards;
        }

        .notfound-btn {
          background: #fff;
          color: #ff6ec4;
          font-weight: 600;
          border: none;
          padding: 12px 30px;
          border-radius: 50px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
          animation: fadeInUp 2.1s ease forwards;
        }

        .notfound-btn:hover {
          background: rgba(255,255,255,0.2);
          color: #fff;
        }

        /* floating circles */
        .notfound-animation .floating-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
          animation: float 6s ease-in-out infinite;
        }
        .circle1 {
          width: 150px;
          height: 150px;
          background: rgba(255,255,255,0.2);
          top: 10%;
          left: 15%;
          animation-delay: 0s;
        }
        .circle2 {
          width: 100px;
          height: 100px;
          background: rgba(255,255,255,0.15);
          bottom: 20%;
          right: 10%;
          animation-delay: 2s;
        }
        .circle3 {
          width: 120px;
          height: 120px;
          background: rgba(255,255,255,0.1);
          top: 50%;
          left: 70%;
          animation-delay: 4s;
        }

        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
          100% { transform: translateY(0px) translateX(0px); }
        }

        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .notfound-title {
            font-size: 8rem;
          }
          .notfound-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </main>
  );
};

export default NotFoundPage;
