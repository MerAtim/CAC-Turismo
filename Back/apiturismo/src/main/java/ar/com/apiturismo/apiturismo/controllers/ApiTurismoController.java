package ar.com.apiturismo.apiturismo.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ar.com.apiturismo.apiturismo.dtos.LugarDto;
import ar.com.apiturismo.apiturismo.responses.Response;
import ar.com.apiturismo.apiturismo.services.LugarService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/apiturismo/lugar")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ApiTurismoController {

	public final static String SUCCESS = "OK";

	private final LugarService service;

	@GetMapping
	public ResponseEntity<Response<List<LugarDto>>> getLugares() {
		log.info("Obteniendo todos los lugares");
		var lugares = service.getLugares();
		var response = new Response<List<LugarDto>>(lugares, SUCCESS, null);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Response<LugarDto>> getLugaresPorId(@PathVariable Long id) {
		log.info("Obteniendo el lugar: " + id);
		var lugar = service.getLugarPorId(id);
		var response = new Response<LugarDto>(lugar, SUCCESS, null);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/nombre/{nombre}")
	public ResponseEntity<Response<List<LugarDto>>> getLugaresPorNombre(@PathVariable String nombre) {
		log.info("Obteniendo el lugar: " + nombre);
		var lugar = service.getLugarPorNombre(nombre);
		var response = new Response<List<LugarDto>>(lugar, SUCCESS, null);
		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<Response<String>> crearLugar(@RequestBody LugarDto lugar) {
		log.info("Agregando nuevo Lugar.");
		service.crearLugar(lugar);
		var response = new Response<String>("Creado.", SUCCESS, null);
		return ResponseEntity.ok(response);
	}

	@PutMapping
	public ResponseEntity<Response<String>> actualizarLugar(@RequestBody LugarDto lugar) {
		log.info("Actualizando lugar.");
		service.actualizarLugar(lugar);
		var response = new Response<String>("Actualizado.", SUCCESS, null);
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Response<String>> actualizarLugar(@PathVariable Long id) {
		service.eliminarLugar(id);
		var response = new Response<String>("Eliminado.", SUCCESS, null);
		return ResponseEntity.ok(response);
	}

}
