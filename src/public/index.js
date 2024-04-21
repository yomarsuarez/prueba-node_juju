document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createForm");
  const bookList = document.getElementById("bookList");
  const loginForm = document.getElementById("loginForm");

  const obtenerToken = async (usuario, contraseña) => {
    try {
      const respuesta = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contraseña }),
      });
      const data = await respuesta.json();
      if (!respuesta.ok) {
        throw new Error(data.message || "Error al obtener el token JWT");
      }
      localStorage.setItem("jwtToken", data.token);
      console.log("Token JWT obtenido:", data.token);
      return data.token;
    } catch (error) {
      console.error("Error al obtener el token JWT:", error.message);
    }
  };

  const obtenerLibros = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("Token JWT no encontrado");
      }
      const respuesta = await fetch("/api/libros", {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await respuesta.json();
      if (!respuesta.ok) {
        throw new Error(data.message || "Error al obtener libros");
      }
      bookList.innerHTML = "";
      data.forEach((libro) => {
        const itemLibro = document.createElement("div");
        itemLibro.textContent = `${libro.Titulo} - ${libro.Autor} - ${libro.AnioPublicacion} - ${libro.Estado}`;

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", async () => {
          const nuevoTitulo = prompt("Ingrese el nuevo título:", libro.Titulo);
          const nuevoAutor = prompt("Ingrese el nuevo autor:", libro.Autor);
          const nuevoAnioPublicacion = prompt(
            "Ingrese el nuevo año:",
            libro.AnioPublicacion
          );
          const nuevoEstado = prompt("Ingrese el nuevo estado:", libro.Estado);
          if (
            nuevoTitulo &&
            nuevoAutor &&
            nuevoAnioPublicacion &&
            nuevoEstado
          ) {
            try {
              const token = localStorage.getItem("jwtToken");
              if (!token) {
                throw new Error("Token JWT no encontrado");
              }
              const respuesta = await fetch(`/api/libros/${libro._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${token}`,
                },
                body: JSON.stringify({
                  Titulo: nuevoTitulo,
                  Autor: nuevoAutor,
                  AnioPublicacion: nuevoAnioPublicacion,
                  Estado: nuevoEstado,
                }),
              });
              const data = await respuesta.json();
              if (!respuesta.ok) {
                throw new Error(data.message || "Error al actualizar libro");
              }
              console.log("Libro actualizado:", data);
              obtenerLibros();
            } catch (error) {
              console.error("Error al actualizar libro:", error.message);
            }
          } else {
            console.error(
              "Todos los campos son obligatorios para actualizar el libro."
            );
          }
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", async () => {
          const confirmacion = confirm(
            "¿Está seguro que desea eliminar este libro?"
          );
          if (confirmacion) {
            try {
              const respuesta = await fetch(`/api/libros/${libro._id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `${token}`,
                },
              });
              const data = await respuesta.json();
              if (!respuesta.ok) {
                throw new Error(data.message || "Error al eliminar libro");
              }
              console.log("Libro eliminado:", data);
              obtenerLibros();
            } catch (error) {
              console.error("Error al eliminar libro:", error.message);
            }
          }
        });

        itemLibro.appendChild(btnEditar);
        itemLibro.appendChild(btnEliminar);
        bookList.appendChild(itemLibro);
      });
    } catch (error) {
      console.error("Error al obtener libros:", error.message);
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = {
      Titulo: document.getElementById("title").value,
      Autor: document.getElementById("author").value,
      AnioPublicacion: document.getElementById("year").value,
      Estado: document.getElementById("estado").value,
    };

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("Token JWT no encontrado");
      }
      const respuesta = await fetch("/api/librosCrear", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data = await respuesta.json();
      if (!respuesta.ok) {
        throw new Error(data.message || "Error al crear libro");
      }
      console.log("Libro creado:", data);
      form.reset();
      obtenerLibros();
    } catch (error) {
      console.error("Error al crear libro:", error.message);
    }
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const usuario = formData.get("username");
    const contraseña = formData.get("password");
    await obtenerToken(usuario, contraseña);
  });

  obtenerLibros();
});
