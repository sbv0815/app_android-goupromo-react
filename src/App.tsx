import React, { useEffect, useState } from "react";
import { IonApp, IonContent, IonLoading } from "@ionic/react";
import "@ionic/react/css/core.css";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const showSplashScreen = async () => {
      try {
        // Mostrar la pantalla de carga
        setLoading(true);

        // Activar el splash screen (mostrar la imagen)
        setShowSplash(true);

        // Esperar 3 segundos antes de redirigir
        setTimeout(() => {
          window.location.href = "https://goupromo.com/login_form.php";
        }, 3000);
      } catch (error) {
        console.error("Error en el proceso:", error);
        setErrorMessage("Hubo un error al procesar la solicitud.");
      } finally {
        setLoading(false);
      }
    };

    showSplashScreen();
  }, []);

  return (
    <IonApp>
      <IonContent fullscreen>
        {loading && <IonLoading isOpen={true} message={"Procesando..."} />}
        {errorMessage && (
          <div style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
            <p>{errorMessage}</p>
          </div>
        )}
        {showSplash && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <img
              src="https://goupromo.com/static/logo3.jpg"
              alt="Logo Splash"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </IonContent>
    </IonApp>
  );
};

export default App;
