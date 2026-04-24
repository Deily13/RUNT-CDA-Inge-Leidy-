# Reglas que debe cumplir el sistema

- Se bebe permitir filtrar por dia, mes y año

- El estado por default de todos los registros de los vehiculos debe de ser inedito

- Cuando se cambie de año todos los registros con estado Aprobado-Actualidazo debe cambiar a estado inedito
(se usara cron para las tareas automaticas de acuerdo a mediciones temporales)

- Si los registros de un mes estan en estado inedito y la fecha cambia la siguiente mes y no estan en estado
llamado u otro estado diferente a inedito, estos registros se modificaran automaticamente al estado vencido

- Si el registro esta en estado reservado y se pasa la fecha de reserva ......?

- Los registros que tengan como Fin_Vigencia_RTM 2027 deben de estar en estado actualizado

- Los mensajes deben de ser dinamicos de manera que muestre Fin_Vigencia_RTM, placa en letras mayusculas y tipo de vehículo en cuestión,
y de acuerdo a este de muestre el precio correspondiente

- El precio debe de ser modificable de acuerdo al usuario del aplicativo (Inge)

- En caso que el registro este en estado inedito y su Fin_Vigencia_RTM sea inferior a la fecha actual el mensaje debera decir vence

- En caso que el registro este en estado inedito y su Fin_Vigencia_RTM sea superior a la fecha actual el mensaje debera decir vence

- Debe poderse filtrar por persona natural con cedula de ciudadania o empresa con NIT

- Debe permitirse crear, actualizar los registros 

- Debe permitir generar la lista de vehilos actualizados por mes 

