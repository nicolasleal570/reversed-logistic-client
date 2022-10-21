import { useRouter } from 'next/router';
import { useOrders } from '@hooks/useOrders';

export function TakeOrderButton({ order, setOrder }) {
  const router = useRouter();
  const { takeOrder } = useOrders();

  if (!order || order?.orderStatus?.id !== 1) {
    return <></>;
  }

  return (
    <button
      type="button"
      className="border border-indigo-600 text-indigo-600 flex items-center px-3 py-2 rounded-lg text-sm mr-2"
      onClick={async () => {
        const { data: updatedOrder } = await takeOrder(order.id);
        if (setOrder) {
          setOrder(updatedOrder);
        } else {
          router.push(`/orders/${updatedOrder.id}`);
        }
      }}
    >
      <span>Tomar orden</span>
    </button>
  );
}
