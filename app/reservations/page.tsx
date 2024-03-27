import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationsClient from "@/app/reservations/ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
        <ClientOnly>
          <EmptyState
              title="Вы не авторизированы"
              subtitle="Пожалуйста, авторизируйтесь!"
          />
        </ClientOnly>
    )
  }

  const reservations = await getReservations({
    authorId: currentUser.id
  });

  if (reservations.length === 0) {
    return (
        <ClientOnly>
          <EmptyState
              title="Бронирований не найдено"
              subtitle="Похоже, что нет бронирований на ваше жилье"
          />
        </ClientOnly>
    )
  }

  return (
      <ClientOnly>
          <ReservationsClient
              reservations={reservations}
              currentUser={currentUser}
          />
      </ClientOnly>
  )
};

export default ReservationsPage;