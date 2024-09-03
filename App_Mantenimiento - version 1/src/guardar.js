 function guardar(){
   db.collection("Activos").add({
   content: document.getElementById("CampamentoInput").value,
   id: document.getElementById("CodigoInput").value,
  })
    .then((docRef) => {
      alert("registro exitoso")
  })
   .catch((error) => {
      alert("Error en el registro")
  });
  }