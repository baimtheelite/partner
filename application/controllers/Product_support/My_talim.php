<?php
defined('BASEPATH') or exit('No direct script access allowed');

class My_talim extends CI_Controller
{
    public $where;

    public function __construct()
    {
        parent::__construct();
        //Load Modul Product Support Ticket
        $this->load->model('ps_ticket');
        //Load Modul Notifikasi
        $this->load->model('notification_model');
        //Load Modul Comment
        $this->load->model('comment_model');
        //Load Modul Users
        $this->load->model('user_model');

        //Load Modul Product Support
        $this->load->model('product_support_model', 'product_support');



        //Jika CMS login maka memunculkan data berdasarkan `id_user`
        if ($this->fungsi->user_login()->level == 1) {
            $this->where = "id_user = $this->fungsi->user_login()->id_user";
        }
        //Jika Sharia Head/Manager login maka memunculkan data berdasarkan data di cabangya.
        else if ($this->fungsi->user_login()->level == 2 || $this->fungsi->user_login()->level == 3) {
            $this->where = "id_branch = $this->fungsi->user_login()->id_branch";
        } else {
            $this->where = "1";
        }

        check_not_login();
    }

    public function index()
    {
    }

    public function create()
    {
    }

    public function edit()
    {
    }

    public function save()
    {
        $post = $this->input->post(null, TRUE);

        $data = [
            'nama_konsumen'         => $post['nama_konsumen'],
            'jenis_konsumen'        => $post['jenis_konsumen'],
            'pendidikan'            => $post['pendidikan'],
            'nama_siswa'            => $post['nama_siswa'],
            'nama_lembaga'          => $post['nama_lembaga'],
            'tahun_berdiri'         => $post['tahun_berdiri'],
            'akreditasi'            => $post['akreditasi'],
            'periode'               => $post['periode'],
            'tujuan_pembiayaan'     => $post['tujuan_pembiayaan'],
            'nilai_pembiayaan'      => $post['nilai_pembiayaan'],
            'informasi_tambahan'    => $post['informasi_tambahan'],

            //Timestamp
            'created_at'            => date('Y-m-d H:i:s'),
            'updated_at'            => date('Y-m-d H:i:s'),

            'id_user'               => $this->fungsi->user_login()->id_user,
            'id_branch'             => $this->fungsi->user_login()->id_branch
        ];

        $this->product_support->create('my_talim', $data);
    }

    public function update()
    {
    }
}