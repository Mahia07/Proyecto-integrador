import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyRole.js";
import { Hotels } from "../models/hoteles.js";

const Adminrouter = express.Router();

Adminrouter.post(
  "/hotels/create",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { name, stars, rating } = req.body;

      if (!name || !stars || !rating) {
        return res
          .status(400)
          .json({ message: "Todos los campos son obligatorios" });
      }

      const newHotel = await Hotels.create({ name, stars, rating });
      res
        .status(201)
        .json({ message: "Hotel creado con éxito", hotel: newHotel });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el hotel" });
    }
  }
);

Adminrouter.put(
  "/hotels/update/:id",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, stars, rating } = req.body;

      const hotel = await Hotels.findByPk(id);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel no encontrado" });
      }

      await hotel.update({ name, stars, rating });
      res.json({ message: `Hotel con ID ${id} actualizado`, hotel });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el hotel" });
    }
  }
);

Adminrouter.delete(
  "/hotels/delete/:id",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      const hotel = await Hotels.findByPk(id);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel no encontrado" });
      }

      await hotel.destroy();
      res.json({ message: `Hotel con ID ${id} eliminado` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el hotel" });
    }
  }
);

export default Adminrouter;
