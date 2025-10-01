const video = document.getElementById("camera");
const tirarFotoBtn = document.getElementById("tirarFoto");
const confirmacao = document.getElementById("confirmacao");
const mensagem = document.getElementById("mensagem");

// Esconde o botão no início
tirarFotoBtn.style.display = "none";

// Função para iniciar câmera e microfone
async function iniciarCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    video.srcObject = stream;

    // Configura ação de Picture-in-Picture
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("enterpictureinpicture", () => {
        video.requestPictureInPicture();
      });
    }

    // Simula detecção de rosto após 3s
    setTimeout(() => {
      mensagem.textContent = "Rosto detectado! Agora tire a foto.";
      tirarFotoBtn.style.display = "inline-block";
    }, 3000);

  } catch (err) {
    alert("Erro ao acessar câmera/microfone: " + err);
  }
}

iniciarCamera();

tirarFotoBtn.addEventListener("click", () => {
  mensagem.textContent = "Verificando rosto...";
  tirarFotoBtn.style.display = "none";

  setTimeout(() => {
    confirmacao.style.display = "block";
    mensagem.textContent = "";

    setTimeout(() => {
      window.location.href = "proxima-parte.html";
    }, 2000);
  }, 2000);
});

// Registro do Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}