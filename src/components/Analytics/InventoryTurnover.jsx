import { Card } from '@components/Card/Card';
import { Tooltip } from './Tooltip';

export function InventoryTurnoverGraph({ inventoryTurnover }) {
  const { count, frequency } = inventoryTurnover ?? {};

  return (
    <Card className="p-0">
      <h2 className="p-4 flex items-center w-full text-lg leading-7 font-semibold border-b border-gray-200">
        Rotación de inventario
        <Tooltip
          title="Envíos del mes"
          description="Este KPI mide el número total de envíos realizados en el mes actual."
        />
      </h2>

      <div className="flex items-center justify-evenly py-6 ">
        <div className="w-[150px] h-[150px] rounded-full flex items-center justify-center flex-col border-4 border-indigo-400">
          <p className="text-5xl font-medium text-gray-700">{count}</p>
          <p className="text-xs font-medium text-center text-gray-600">
            Total de rotaciones <br /> este mes
          </p>
        </div>

        <div className="w-[150px] h-[150px] rounded-full flex items-center justify-center flex-col border-4 border-indigo-400">
          <p className="text-5xl font-medium text-gray-700">
            {frequency.split(' ')[0]}
          </p>
          <p className="text-xs font-medium text-center text-gray-600">
            Rotación por <br /> día del mes <br /> (Frecuencia)
          </p>
        </div>
      </div>
    </Card>
  );
}
