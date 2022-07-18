import classNames from 'classnames';

export function FormRow({ children, className }) {
  return (
    <section className={classNames('block w-full mb-4', className)}>
      {children}
    </section>
  );
}
