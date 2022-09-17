import { useMemo } from 'react';
import { SelectField } from '@components/SelectField/SelectField';

export function MultipleSelectCasesField({
  allCases,
  selectedCases,
  errors,
  register,
  idx,
  fieldName,
  ...props
}) {
  const filteredCases = useMemo(() => {
    const selectedCasesIds = selectedCases
      .map((item) => Number.parseInt(item.caseId, 10 || '0'))
      .filter(Boolean);

    return allCases.filter((caseInfo) => {
      if (caseInfo.id === Number.parseInt(selectedCases[idx]?.caseId || '0')) {
        return caseInfo;
      }

      return !selectedCasesIds.includes(caseInfo.id);
    });
  }, [allCases, selectedCases, idx]);

  return (
    <SelectField
      id="caseId"
      name="caseId"
      errors={errors?.cases?.[idx]}
      placeholder="Selecciona un case"
      inputProps={{
        ...register(fieldName, {
          required: 'Debes seleccionar un case',
        }),
      }}
      options={filteredCases.map((caseInfo) => ({
        label: caseInfo.name,
        value: caseInfo.id,
      }))}
      {...props}
    />
  );
}
