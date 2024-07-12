package ar.com.apiturismo.apiturismo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import ar.com.apiturismo.apiturismo.responses.Response;

@RestControllerAdvice
public class ExceptionsHandler {

	@ExceptionHandler(LugarNoEncontradoException.class)
	@ResponseStatus(code = HttpStatus.NOT_FOUND)
	public ResponseEntity<Response<String>> handleResourceNotFoundException(LugarNoEncontradoException ex) {

		var response = new Response<String>(null, "ERROR", ex.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@ExceptionHandler(Exception.class)
	@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
	public ResponseEntity<Response<String>> handleException(Exception ex) {

		var response = new Response<String>(null, "ERROR", ex.getMessage());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

}
