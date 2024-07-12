package ar.com.apiturismo.apiturismo.exceptions;

public class LugarNoEncontradoException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public LugarNoEncontradoException() {
		super("No se ha encontrado el lugar.");
	}
}
