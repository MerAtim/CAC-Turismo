package ar.com.apiturismo.apiturismo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import ar.com.apiturismo.apiturismo.dtos.LugarDto;
import ar.com.apiturismo.apiturismo.entities.Lugar;
import ar.com.apiturismo.apiturismo.exceptions.LugarNoEncontradoException;
import ar.com.apiturismo.apiturismo.repositories.LugarRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class LugarService {

	private final LugarRepository repository;

	public List<LugarDto> getLugares() {

		return repository.findAll().stream().map(l -> new LugarDto(l)).toList();

	}

	public void crearLugar(LugarDto lugar) {
		try {
			repository.save(new Lugar(lugar));
		} catch (Exception e) {
			logError("agregar", e);
		}
	}

	public LugarDto getLugarPorId(Long id) {
		var lugar = repository.findById(id).orElseThrow(() -> new LugarNoEncontradoException());
		return new LugarDto(lugar);
	}

	public void actualizarLugar(LugarDto lugar) {
		try {
			repository.save(new Lugar(lugar));
		} catch (Exception e) {
			logError("actualizar", e);
		}
	}

	public void eliminarLugar(Long id) {
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			logError("eliminar", e);
		}

	}

	public List<LugarDto> getLugarPorNombre(String nombre) {
		var lugares = repository.findByNombre(nombre);
		return lugares.stream().map(l -> new LugarDto(l)).toList();
	}

	private void logError(String tipoOperacion, Exception e) {
		log.info("Ha ocurrido el siguiente error al " + tipoOperacion + " el lugar: " + e.getMessage());
	}

}
