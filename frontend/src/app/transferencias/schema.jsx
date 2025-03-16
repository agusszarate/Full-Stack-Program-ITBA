import * as yup from "yup";

export const transferenciaSchema = yup.object({
  CBU: yup
    .string()
    .required("Por favor ingrese un CBU válido"),

  monto: yup
    .string()
    .required("Por favor ingrese un monto")
    .matches(
      /^[0-9]*[.,]?[0-9]*$/,
      "Por favor ingrese un monto válido (solo números y decimales)"
    )
    .test("is-valid-number", "El monto debe ser un número válido", (value) => {
      const parsedValue = parseFloat(value.replace(",", "."));
      return !isNaN(parsedValue) && parsedValue > 0;
    })
    .test(
      "saldo-suficiente",
      "El monto no puede ser mayor al saldo disponible",
      (value, context) => {
        const parsedValue = parseFloat(value.replace(",", "."));
        const cuenta = context.options.context?.cuenta;
        return parsedValue <= cuenta?.balance;
      }
    ),
});
