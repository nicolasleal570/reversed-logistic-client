import dayjs from 'dayjs';
import { DataSection } from '@components/CreateUser/CreateUserSummary/DataSection';
import { cleanProcessOrderStatusColor } from '@components/CleanProcessTable/CleanProcessTable';
import { formatDuration } from '@utils/formatDuration';
import { StepCard } from './StepCard';
import { useCleanProcess } from '@hooks/useCleanProcess';
import classNames from 'classnames';

export function CleanProcessSummary({
  cleanProcessOrder,
  setCleanProcessOrder,
}) {
  const { doneCleanProcess } = useCleanProcess();
  const {
    customerLocation,
    status,
    startedAt,
    finishedAt,
    case: caseInfo,
    caseContent,
    steps,
  } = cleanProcessOrder ?? {};

  const allStepsDone =
    cleanProcessOrder?.steps?.filter((elem) => elem.isDone).length ===
    cleanProcessOrder?.steps?.length;

  if (!cleanProcessOrder) {
    return (
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Loading...
      </h2>
    );
  }

  return (
    <div className="w-full">
      <h2 className="block w-full text-lg leading-7 font-semibold mb-8">
        Información de la orden
      </h2>

      <DataSection
        label="Estado"
        badge={{
          title: status?.name,
          color: cleanProcessOrderStatusColor[status?.value],
        }}
      />

      <DataSection
        label="Fecha y hora de comienzo"
        value={
          startedAt
            ? dayjs(startedAt).format('hh:mm A - dddd DD MMMM YYYY')
            : '-'
        }
      />

      <DataSection
        label="Fecha y hora de fin"
        value={
          finishedAt
            ? dayjs(finishedAt).format('hh:mm A - dddd DD MMMM YYYY')
            : '-'
        }
      />

      <DataSection
        label="Duración de la limpieza"
        value={formatDuration(startedAt, finishedAt)}
      />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Información del Case
      </h2>

      <DataSection label="Case" value={caseInfo.name} />

      <DataSection label="Contenido que tenía" value={caseContent.name} />

      <DataSection
        label="Comentarios de almacén"
        value={caseContent.details || '-'}
      />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Información del Cliente
      </h2>

      <DataSection
        label="Cliente"
        value={customerLocation.customer.companyName}
      />

      <DataSection label="Sucursal" value={customerLocation.name} />

      <DataSection
        label="Contacto de la sucursal"
        value={customerLocation.contact}
      />

      <h2 className="block w-full text-lg leading-7 font-semibold pt-8 mb-8 border-t border-gray-200 mt-8">
        Lista de pasos de limpieza
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => {
          return (
            <StepCard
              key={`${step.id}-${step.processStep.name}`}
              step={step}
              cleanProcessOrder={cleanProcessOrder}
              setCleanProcessOrder={setCleanProcessOrder}
            />
          );
        })}
      </div>

      <div className="w-full lg:w-96">
        {status.value === 'IN_CLEAN_PROCESS' && (
          <button
            type="button"
            className={classNames(
              'w-full flex items-center justify-center px-3 py-2.5 rounded-lg text-white bg-indigo-600 mt-8',
              {
                'text-gray-400 bg-gray-200': !allStepsDone,
              }
            )}
            onClick={async () => {
              const { data: updatedData } = await doneCleanProcess(
                cleanProcessOrder.id
              );
              setCleanProcessOrder({
                ...updatedData,
                steps: updatedData.steps.sort((a, b) => a.order - b.order),
              });
            }}
            disabled={!allStepsDone}
          >
            Finalizar limpieza
          </button>
        )}
      </div>
    </div>
  );
}
