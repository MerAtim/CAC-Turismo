package ar.com.apiturismo.apiturismo.dtos;

import java.util.Base64;

import ar.com.apiturismo.apiturismo.entities.Lugar;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LugarDto {
	private Long id;
	private String nombre;
	private String descripcion;
	private String ubicacion;
	private String categoria;
	private String imagen;

	public LugarDto(Lugar entity) {
		id = entity.getId();
		nombre = entity.getNombre();
		descripcion = entity.getDescripcion();
		ubicacion = entity.getUbicacion();
		categoria = entity.getCategoria();
		imagen = Base64.getEncoder().encodeToString(entity.getImagen());
	}
}
