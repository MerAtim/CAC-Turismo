package ar.com.apiturismo.apiturismo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ar.com.apiturismo.apiturismo.entities.Lugar;

@Repository
public interface LugarRepository extends JpaRepository<Lugar, Long> {

	@Query(value = "SELECT * FROM lugares WHERE nombre LIKE %:nombre%", nativeQuery = true)
	List<Lugar> findByNombre(@Param("nombre") String nombre);

}
