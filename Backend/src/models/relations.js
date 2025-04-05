import { Users } from "./usuarios.js";
import { Location } from "./ubicacion.js";
import { Hotels } from "./hoteles.js";
import { Bedrooms } from "./habitaciones.js";
import { Characteristics } from "./comodidades.js";
import { Opinions } from "./opiniones.js";
import { Reservations } from "./reservas.js";
import { Payments } from "./pagos.js";
import { BedroomsDiscount } from "./ofertas_habitaciones.js";

export const defineRelations = () => {
  // Relacion muchos a muchos entre habitaciones y reservas
  Bedrooms.belongsToMany(Reservations, {
    through: "ReservaHabitacion",
    foreignKey: "habitacionId",
  });
  Reservations.belongsToMany(Bedrooms, {
    through: "ReservaHabitacion",
    foreignKey: "reservaId",
  });
  // Relacion 1 a 1 entre reservas y pagos
  Payments.belongsTo(Reservations, { foreignKey: "reservaId" });
  Reservations.hasOne(Payments, { foreignKey: "reservaId" });
  // Relacion 1 a muchos entre usuarios y opiniones
  Opinions.belongsTo(Users, { foreignKey: "usuarioId" });
  Users.hasMany(Opinions, { foreignKey: "usuarioId" });
  // Relaciones 1 a muchos entre hoteles y habitaciones
  Hotels.hasMany(Bedrooms, { foreignKey: "hotelId" });
  Bedrooms.belongsTo(Hotels, { foreignKey: "hotelId" });
  // Relacion 1 a muchos entre ubicacion y hoteles
  Location.hasMany(Hotels, { foreignKey: "ubicacionId" });
  Hotels.belongsTo(Location, { foreignKey: "ubicacionId" });
  //Relacion muchos a muchos entre habitaciones y comodidades
  Bedrooms.belongsToMany(Characteristics, {
    through: "HabitacionComodidad",
    foreignKey: "habitacionId",
  });
  Characteristics.belongsToMany(Bedrooms, {
    through: "HabitacionComodidad",
    foreignKey: "comodidadId",
  });
  // Relacion 1 a muchos
  Hotels.hasMany(Opinions, { foreignKey: "hotelId" });
  Opinions.belongsTo(Hotels, { foreignKey: "hotelId" });
  // Relacion 1 a muchos entre Usuarios y reservas
  Users.hasMany(Reservations, { foreignKey: "usuarioId" });
  Reservations.belongsTo(Users, { foreignKey: "usuarioId" });
  // Relacion 1 a 1 entre habitaciones y OfertaHabitaciones
  Bedrooms.hasOne(BedroomsDiscount, { foreignKey: "habitacionId" });
  BedroomsDiscount.belongsTo(Bedrooms, { foreignKey: "habitacionId" });
  // Relacion 1 a muchos entre Hoteles y Reservas
  Hotels.hasMany(Reservations, { foreignKey: "hotelId" });
  Reservations.belongsTo(Hotels, { foreignKey: "hotelId" });
};
console.log("defineRelations ejecutandose");
defineRelations();
