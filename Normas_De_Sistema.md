## 📜 Reglas que debe cumplir el sistema

-Solo el ingeniere puede ingresar al sistema
- Debe permitir **filtrar registros por día, mes y año**.
- Debe permitir filtrar por **persona natural** (con cédula de ciudadanía) o **empresa** (con NIT).
- Se deben poder realizar **consultas múltiples** de manera simultánea. Ejemplo: consultar los registros vencidos en el mes de abril.
- El **estado por defecto** de todos los registros de vehículos debe ser **Inédito**.
- Al cambiar de año, todos los registros con estado **Aprobado-Actualizado** deben pasar automáticamente a estado **Inédito** 
(se usará **cron** para las tareas automáticas basadas en mediciones temporales).
- Si los registros de un mes están en estado **Inédito** y la fecha cambia al mes siguiente, y no se encuentran en estado **En trámite** 
u otro diferente a Inédito, dichos registros se modificarán automáticamente al estado **Vencido**.
- Si un registro está en estado **Reservado** y se supera la fecha de reserva, (pendiente de especificación).
- Los registros cuyo **Fin_Vigencia_RTM** sea **2027** deben permanecer en estado **Actualizado**.
- Los mensajes generados deben ser **dinámicos**, mostrando:
  - `Fin_Vigencia_RTM`
  - `Placa` (en letras mayúsculas)
  - `Tipo de vehículo`
  - El **precio correspondiente** según el tipo de vehículo.
- El **precio** debe ser modificable por el usuario del aplicativo (ingeniere).
- Si un registro está en estado **Inédito** y su **Fin_Vigencia_RTM** es **inferior** a la fecha actual, el mensaje debe indicar **“Vencio”**.
- Si un registro está en estado **Inédito** y su **Fin_Vigencia_RTM** es **superior** a la fecha actual, el mensaje también debe indicar **“Vence”**.
- Debe permitir **crear y actualizar registros**.
- Debe permitir **generar la lista de vehículos actualizados por mes**.  
- En caso de que no se cuente con el tiempo suficiente para ingresar el campo de la licencia de conducción, se debe permitir **subir la fotografía de la licencia** como respaldo temporal.
- Al realizar esta acción, será **obligatorio ingresar también el número de teléfono del propietario**.
- Si no se proporciona el número de teléfono junto con la fotografía, el registro **no podrá ser guardado**.  

