import { useGetUsuariosQuery } from "../service/ecApi";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Box,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import img1 from "../assets/img1.png";

const FOTO_MASC = "https://cdn-icons-png.flaticon.com/512/456/456212.png";
const FOTO_FEM = "https://cdn-icons-png.flaticon.com/512/456/456141.png";
const FOTO_DEFAULT = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

function detectarGenero(nombre = "") {
  const n = nombre.trim().toLowerCase();

  const femeninos = [
    "florencia","giselle","gisel","magali","mariana","marisa","marcia",
    "nancy","luciana","brenda","alejandra","jesica","iara","carina",
    "milagros","verónica","lucía","myrian","laura","ana","soledad",
    "marisa","natalia","bianca"
  ];

  const masculinos = ["gabriel", "franco", "diego", "alejandro"];

  if (femeninos.some(f => n.includes(f))) return "femenino";
  if (masculinos.some(m => n.includes(m))) return "masculino";

  if (n.endsWith("a")) return "femenino";
  if (n.endsWith("o")) return "masculino";

  return null;
}

function Admin() {
  const { data, isLoading, isError } = useGetUsuariosQuery();
  const [filtro, setFiltro] = useState("todos"); // ⭐ filtro activo

  if (isLoading) return <p>Cargando usuarios...</p>;
  if (isError) return <p>Error al cargar usuarios</p>;

  // Filtrar solo Acompañantes Terapéuticos
  const acompanantes = data?.filter(u => u.rol === "at") ?? [];

  // Detectar género
  const acompanantesConGenero = acompanantes.map(u => ({
    ...u,
    generoFinal: u.genero || detectarGenero(u.nombre),
  }));

  // Contadores
  const cantidadTotalAT = acompanantesConGenero.length;
  const cantidadATFemenino = acompanantesConGenero.filter(u => u.generoFinal === "femenino").length;
  const cantidadATMasculino = acompanantesConGenero.filter(u => u.generoFinal === "masculino").length;

  // ⭐ Aplicar filtro seleccionado
  const usuariosFiltrados = acompanantesConGenero.filter(u => {
    if (filtro === "todos") return true;
    if (filtro === "femenino") return u.generoFinal === "femenino";
    if (filtro === "masculino") return u.generoFinal === "masculino";
    return true;
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
        Usuarios AT
      </Typography>

      {/* 👉 MÉTRICAS clickeables */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Acompañantes Terapéuticos:</Typography>

        <Typography
          variant="body1"
          sx={{ cursor: "pointer" }}
          onClick={() => setFiltro("todos")}
        >
          Total: <strong>{cantidadTotalAT}</strong>
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "#c2185b", cursor: "pointer" }}
          onClick={() => setFiltro("femenino")}
        >
          Femenino: <strong>{cantidadATFemenino}</strong>
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "#1976d2", cursor: "pointer" }}
          onClick={() => setFiltro("masculino")}
        >
          Masculino: <strong>{cantidadATMasculino}</strong>
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {usuariosFiltrados.map((u) => {
          const foto =
            u.generoFinal === "masculino"
              ? FOTO_MASC
              : u.generoFinal === "femenino"
              ? FOTO_FEM
              : FOTO_DEFAULT;

          return (
            <Grid item xs={12} sm={6} md={4} key={u.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, paddingBottom: 1 }}>
                <CardMedia component="img" height="180" image={img1} alt={u.nombre} />

                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <Avatar src={foto} />
                    <Typography variant="h6">{u.nombre}</Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {u.email}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>User ID:</strong> {u.userId}
                  </Typography>

                  <Box mt={2} display="flex" gap={1}>
                    <Chip label={u.estado} color={u.estado === "activo" ? "success" : "default"} />
                    <Chip label={u.rol} color="primary" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Admin;
