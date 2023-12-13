package com.trabalho.demo.Controller;


import com.trabalho.demo.Entity.Usuario;
import com.trabalho.demo.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping(path="usuario/add")
    public @ResponseBody String novoUsuario (@RequestBody Usuario usuario) {
        usuarioRepository.save(usuario);
        return "Savo";
    }


    @GetMapping(path="usuario/all")
    public @ResponseBody Iterable<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

}
