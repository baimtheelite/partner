<div class="row">
                                    <div class="col-sm-12">
                                        <div class="page-title-box">
                                            <h4 class="page-title">Partnership</h4>
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="javascript:void(0);">Helpdesk</a></li>
                                                <li class="breadcrumb-item"><a href="javascript:void(0);">Kerjasama</a></li>
                                                <li class="breadcrumb-item active">Partnership</li>
                                            </ol>
                                        </div>
                                    </div>
                            </div>

                            <div class="row">
                                    <div class="col-lg-12">
                                            <div class="card m-b-20">
                                                <div class="card-body">
                                                    <div id="wizard_container">
                                                        <div id="top-wizard">
                                                            <div id="progressbar"></div>
                                                        </div>
                                                        <div id="top-wizard">
                                                                <form action="<?= base_url('Home/save_stage1') ?>" method="post">
                                                                    <input id="website" name="website" type="disable" value="">
                                                                    <!-- Leave for security protection, read docs for details -->
                                                                    <div id="middle-wizard">
                                                                        <div class="step">
                                                                            <div class="row mb-3">
                                                                                <div class="col-md-12">
                                                                                        <h4 class="mt-0 header-title">Formulir Leads</h4>
                                                                                        <p class="text-muted text-size">Pilih data yang sudah anda mapping pada pilihan yang akan muncul dilayar, kemudia isi semua kolom pertanyaan untuk melanjutkan ke halaman selanjutnya.</p>
                                                                                </div>
                                                                            </div>  
                                                                            <div class="form-row">
                                                                                <div class="col-md-6">
                                                                                        <div class="form-group ml-3 mr-3">
                                                                                            <label>Leads ID</label>
                                                                                            <input type="text" class="form-control placement" name="leads_id" id="leads_id" required placeholder="009377736433744" maxlength="15">
                                                                                        </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <label class="ml-3">Nama Konsumen</label>
                                                                                    <div class="input-group ml-3 mb-3">
                                                                                        <input type="text" class="form-control" name="nama-konsumen" id="nama-konsumen" required placeholder="Ibrahim Ahmad" aria-label="Recipient's username" aria-describedby="button-addon2" readonly>
                                                                                        <div class="input-group-append">
                                                                                            <button class="btn btn-primary mr-4" type="button" id="button-addon2" data-toggle="modal" data-target=".bd-example-modal-xl"><span class="ion-ios7-search-strong"></span></button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="form-row">
                                                                                <div class="col-md-3">
                                                                                    <div class="form-group ml-3 mr-3">
                                                                                        <label>Nomor Telepon / Whatsapp</label>
                                                                                        <input type="text" class="form-control placement" onkeypress="return hanyaAngka(event);" name="telepon" id="telepon" required placeholder="0811977500" maxlength="15"/>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-3">
                                                                                    <div class="form-group ml-3 mr-3">
                                                                                        <label>ID Ktp</label>
                                                                                        <input type="phone" class="form-control placement" onkeypress="return hanyaAngka(event);" name="id_ktp" id="id_ktp" required placeholder="0786 6875 8725 3564" maxlength="16"/>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-3">
                                                                                    <div class="form-group mr-3 ml-3">
                                                                                        <label>Asal Aplikasi</label>
                                                                                        <select class="form-control" name="soa" id="soa">
                                                                                            <option selected>Pilih Source Aplikasi</option>
                                                                                            <option value="Direct Selling">Direct Selling</option>
                                                                                            <option value="Tour & travel">Tour & travel</option>
                                                                                            <option value="Penyedia Jasa">Penyedia Jasa</option>
                                                                                            <option value="Agent BA">Agent BA</option>
                                                                                            <option value="EGC">EGC</option>
                                                                                            <option value="CGC">CGC</option>
                                                                                            <option value="Digital Marketing">Digital Marketing</option>
                                                                                            <option value="Website BFI Syariah">Website BFI Syariah</option>
                                                                                            <option value="RO">RO</option>
                                                                                            <option value="Walkin">Walkin</option>
                                                                                            <option value="Event">Event</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-3 disable">
                                                                                        <label class="ml-3 travel">Pilih Data Travel</label>
                                                                                        <label class="ml-3 jasa">Pilih Data Penyedia Jasa</label>
                                                                                        <label class="ml-3 agent">Pilih Data Agent</label>
                                                                                        <div class="input-group ml-3 mr-3">
                                                                                            <input type="text" class="form-control" name="id_partner" id="id_partner" required placeholder="aaaa" aria-label="Recipient's username" aria-describedby="button-addon2" readonly>
                                                                                            <div class="input-group-append mr-4">
                                                                                                <button class="btn btn-primary" type="button" id="button-addon2" data-toggle="modal" data-target=".bd-example-modal-xl"><span class="ion-ios7-search-strong"></span></button>
                                                                                            </div>
                                                                                        </div>
                                                                                </div>
                                                                                <div class="col-md-3 disablee">
                                                                                    <div class="form-group ml-3 mr-3">
                                                                                        <label>Nama Event</label>
                                                                                        <input type="text" class="form-control" name="nama_event" id="nama_event" placeholder="Input Nama Event">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="form-row">
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group mr-3 ml-3">
                                                                                        <label>Produk</label>
                                                                                        <select class="form-control" name="produk" id="produk">
                                                                                            <option selected>Pilih Kategori Produk</option>
                                                                                            <option value="My Ihram">My Ihram</option>
                                                                                            <option value="My Safar">My Safar</option>
                                                                                            <option value="My Talin">My Talin</option>
                                                                                            <option value="My Hajat">My Hajat</option>
                                                                                            <option value="My Faedah">My Faedah</option>
                                                                                            <option value="My CarS">My CarS</option>    
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-md-6">
                                                                                    <div class="form-group ml-3 mr-3">
                                                                                        <label>Follow Up By</label>
                                                                                        <select class="form-control" name="follow_up_by" id="follow_up_by" required>
                                                                                            <option selected disabled value="">Pilih Follow Up By</option>
                                                                                            <option value="kunjungan">kunjungan</option>
                                                                                            <option value="Telepon">Telepon</option>
                                                                                            <option value="Whatsapp">Whatsapp</option>
                                                                                            <option value="Email">Email</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="form-row">
                                                                                    
                                                                                    <div class="col-md-2">
                                                                                        <div class="form-group ml-3 mr-3 posisi">
                                                                                            <label>Appeal NST</label><br>
                                                                                            <div class="form-check form-check-inline mt-2">
                                                                                                <input class="form-check-input" type="radio" name="appeal_nst" id="appeal_nst" required value="Ya">
                                                                                                <label class="form-check-label">
                                                                                                    Ya
                                                                                                </label>
                                                                                            </div>
                                                                                            <div class="form-check form-check-inline">
                                                                                                <input class="form-check-input" type="radio" name="appeal_nst" id="appeal_nst" required value="Tidak">
                                                                                                <label class="form-check-label">
                                                                                                    Tidak
                                                                                                </label>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-md-2">
                                                                                        <div class="form-group ml-3 mr-3 posisi">
                                                                                            <label>Cross Branch?</label><br>
                                                                                            <div class="form-check form-check-inline mt-2">
                                                                                                <input class="form-check-input cross_branch" type="radio" name="cross_branch" id="cross_branch" required value="Ya">
                                                                                                <label class="form-check-label">
                                                                                                    Ya
                                                                                                </label>
                                                                                            </div>
                                                                                            <div class="form-check form-check-inline">
                                                                                                <input class="form-check-input cross_branch" type="radio" name="cross_branch" id="cross_branch" required value="Tidak">
                                                                                                <label class="form-check-label">
                                                                                                    Tidak
                                                                                                </label>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-md-2">
                                                                                        <div id="hide" class="form-group ml-3 mr-3" >
                                                                                            <label>Pilih cabang</label>
                                                                                            <select class="form-control" name="cabang_cross" id="cabang_cross">
                                                                                                <option selected disabled value="">Pilih Cabang</option>
                                                                                                <option value="kunjungan">kunjungan</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-md-6">
                                                                                        <div class="form-group ml-3 mr-3">
                                                                                            <label>Pic Tandatangan</label>
                                                                                            <input type="text" class="form-control" name="pic_ttd" id="pic_ttd" required placeholder="Pic Tandatangan">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="form-row">
                                                                                    <div class="col-md-6">
                                                                                        <div class="form-group ml-3 mr-3">
                                                                                            <label>Surveyor</label>
                                                                                            <input type="text" class="form-control" name="surveyor" id="surveyor" required placeholder="Surveyor">
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-md-6">
                                                                                        <div class="form-group ml-3 mr-3">
                                                                                            <label>Nilai Funding</label>
                                                                                            <input type="text" class="form-control" onkeypress="return hanyaAngka(event);" name="nilai_funding" id="nilai_funding" required placeholder="Surveyor">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                        </div>
                                                                        <div class="submit step">
                                                                                <div class="row mb-3">
                                                                                    <div class="col-md-12">
                                                                                        <h4 class="mt-0 header-title">Formulir Partnership</h4>
                                                                                        <p class="text-muted">Alhamdulillah, sudah pada bagian terakhir dari pendaftaran partner ini. Pastikan semua data yang dikirim benar dan valid .<br>Silahkan isi</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row">
                                                                                    <div class="col-md-4">
                                                                                        <label>KTP</label>
                                                                                        <div action="#" class="dropzone">
                                                                                            <div class="fallback">
                                                                                                <input name="ktp" type="file">
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-md-4">
                                                                                        <label>Foto Selfie</label>
                                                                                        <div action="#" class="dropzone">
                                                                                            <div class="fallback">
                                                                                                <input name="selfie_foto" type="file">
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-md-4">
                                                                                        <label>Foto Penyedia Jasa</label>
                                                                                        <div action="#" class="dropzone">
                                                                                            <div class="fallback">
                                                                                                <input name="foto_pentedia_jasa" type="file">
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                        </div>
                                                                        <!-- /step-->
                                                                    </div>
                                                                    <!-- /middle-wizard -->
                                                                    <div class="form-group mb-0 float-right mt-3 mr-3">
                                                                        <button class="btn btn-danger waves-effect waves-light text-size" id="draft" class="btn" type="submit">Draft</button>
                                                                        <button class="btn btn-secondary waves-effect waves-light backward text-size" type="button" name="backward">Kembali</button>
                                                                        <button class="btn btn-primary waves-effect waves-light forward text-size" type="button" name="forward">Selanjutnya</button>
                                                                        <button class="btn btn-primary waves-effect waves-light submit text-size" type="submit" name="process" data-toggle="modal" data-target="#modalBerhasil">Simpan</button>
                                                                    </div>
                                                                    <!-- /bottom-wizard -->
                                                                </form>            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div> <!-- end col -->
                            </div>
                    </div> <!-- container-fluid -->
                    

<!-- Modal -->
<div class="modal fade" id="modalBerhasil" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-center" id="exampleModalCenterTitle">Pengajuan Kerjasama Berhasil</h5>
            </div>
            <div class="modal-body">
                Terimakasih telah menyelesaikan tugas perjanjian kerjasama dengan partner potensial di daerah anda.
                Tim HO akan memverifikasi data anda, dan informasinya akan diberikan melalui menu <a href="#" style="color: blue;">motification</a> di website ini.
            </div>
            <div class="modal-footer">
                <a href="index.html"><button class="btn btn-primary">OK</button></a>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->

<!-- Modal -->
<div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-body">
                <div class="modal-header mb-2">
                    <h4 class="modal-title">Cari Data Partner</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <table id="" class="datatable table table-striped table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                        <tr>
                            <th>Nama Konsumen</th>
                            <th>Produk</th>
                            <th>Telepon</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($mapping->result() as $data) { ?>
                            <tr class="clickable-row" data-mapping="<?= $data->mapping_id ?>" data-konsumen="<?= $data->nama_konsumen ?>" data-soa="<?= $data->soa ?>" data-telepon="<?= $data->telepon ?>" data-produk="<?= $data->produk ?>">
                                <td class="not-clickable">
                                    <div class="text-size"><?= $data->nama_konsumen ?></div>
                                </td>
                                <td>
                                    <div class="text-size"><?= $data->produk ?></div>
                                </td>
                                <td>
                                    <div class="text-size"><?= $data->telepon ?></div>
                                </td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->

<script>
    $("tr.clickable-row").not("tr > td.not-clickable").css('cursor', 'pointer');
    $("table").on("click", ".not-clickable", function(e) {
        e.stopPropagation();
    });
    $("table").on('click', '.clickable-row', function() {
        $("tr.clickable-row").not("tr > td.not-clickable").css('cursor', 'pointer');

        var id_mapping = $(this).data('mapping');
        var nama_konsumen = $(this).data('konsumen');
        var produk = $(this).data('produk');
        var telepon = $(this).data('telepon');
        var soa = $(this).data('soa');
        // var ktp = $(this).data('ktp');

        $('#id_mapping_leads').val(id_mapping);
        $('#nama_konsumen').val(nama_konsumen);
        $('#produk').val(produk);
        $('#telepon').val(telepon);
        $('#soa').val(soa);
        // $('#ktp').val(ktp);

        $('.bd-example-modal-xl').modal('hide');
        console.log('clicked');
    })
</script>

<script>
            $('.travel').hide();
            $('.agent').hide();
            $('.jasa').hide();
            $('.disable').hide();
            $('.disablee').hide();
            $('#soa').change(function() {
                if ($('#soa').val() == 'Tour & travel') {
                    $('.travel, .disable').show();
                    $('#id_partner').attr('placeholder','jalan - jalan')
                    $('.agent, .jasa, .disablee').hide();
                } else if ($('#soa').val() == 'Penyedia Jasa'){
                    $('.jasa, .disable').show();
                    $('#id_partner').attr('placeholder','Jasa raharja')
                    $('.agent, .travel, .disablee').hide();
                } else if ($('#soa').val() == 'Agent BA'){
                    $('.agent, .disable').show();
                    $('#id_partner').attr('placeholder','Ibrahim')
                    $('.jasa, .travel, .disablee').hide();
                } else if ($('#soa').val() == 'Event'){
                    $('.disablee').show();
                    $('.disable').hide();
                    $('.jasa, .travel, .agent, .disable').hide();
                }
            })
    </script>