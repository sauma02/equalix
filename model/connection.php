<?php

class Connection{

    private $conn;

    public function __construct(){
        $this _> con = new msqli('localhost', 'root', '', 'equifax');
    }

    public function getUsuarios(){
        $query = $this->con->query('SELECT * FROM usuarios');

        $retorno = [];

        $i = 0;

        while($fila = $query->fetch_assoc()){
            $retorno[$i] = $fila;
            $i++
        }
        return $retorno;
    }

    public function getUsuarioPorCD($doc){
        $query = $this->con->query('SELECT nombre FROM usuarios WHERE cedula = '+$doc);
    }


}

?>