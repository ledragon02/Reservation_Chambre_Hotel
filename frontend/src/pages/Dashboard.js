import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/reservations",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setReservations(res.data);

      } catch (err) {
        alert("Erreur chargement réservations");
      }
    };

    fetchReservations();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h2>Mes réservations</h2>

      {reservations.map(reservation => (
        <div key={reservation.id} style={{ border: "1px solid black", margin: 10, padding: 10 }}>
          <p>ID: {reservation.id}</p>
          <p>Date début: {reservation.date_debut}</p>
          <p>Date fin: {reservation.date_fin}</p>
          <p>Prix: {reservation.prix_total} €</p>
          <p>Statut: {reservation.statut}</p>
          <p>Paiement: {reservation.statut_paiement}</p>
        </div>
      ))}

    </div>
  );
}

export default Dashboard;
