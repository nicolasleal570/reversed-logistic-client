import React from 'react';
import { Tab } from '@headlessui/react';
import { TableTabs } from './TableTabs';
import { AvailableCasesTable } from './AvailableCasesTable';
import { DisabledCasesTable } from './DisabledCasesTable';

export function CasesTable({ cases }) {
  return (
    <>
      <TableTabs tabs={['Cases habilitados', 'Cases inhabilitados']}>
        <Tab.Panel className="pt-4">
          <AvailableCasesTable cases={cases} />
        </Tab.Panel>
        <Tab.Panel className="pt-4">
          <DisabledCasesTable />
        </Tab.Panel>
      </TableTabs>
    </>
  );
}
