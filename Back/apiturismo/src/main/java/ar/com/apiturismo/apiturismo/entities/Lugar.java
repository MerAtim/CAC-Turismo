package ar.com.apiturismo.apiturismo.entities;

import java.util.Base64;

import ar.com.apiturismo.apiturismo.dtos.LugarDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lugares")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Lugar {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private Long id;

	@Column(nullable = false)
	private String nombre;

	@Column(nullable = false)
	private String descripcion;

	@Column(nullable = false)
	private String ubicacion;

	@Column(nullable = false)
	private String categoria;

	@Lob
	@Column(nullable = false)
	private byte[] imagen;

	public Lugar(LugarDto dto) {
		id = dto.getId();
		nombre = dto.getNombre();
		descripcion = dto.getDescripcion();
		ubicacion = dto.getUbicacion();
		categoria = dto.getCategoria();
		imagen = Base64.getDecoder().decode(dto.getImagen());
	}

}
