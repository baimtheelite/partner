<div class="row">
	<div class="col-md-8">
		<div class="page-title-box ml-4">
			<h4 class="page-title">Leads Detail</h4>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="javascript:void(0);">Helpdesk</a></li>
				<li class="breadcrumb-item"><a href="javascript:void(0);">Leads</a></li>
				<li class="breadcrumb-item"><a href="javascript:void(0);">Database</a></li>
				<li class="breadcrumb-item active">Leads Detail</li>
			</ol>
		</div>

		<div class="card">
			<div class="card-body">
				<div id="hilang" class="loader-body">
					<div id="loader"></div>
					<div id="loadermobile"></div>
				</div>
				<div style="display:none;" id="myDiv" class="animate-bottom">
					<ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="tab" href="#home2" role="tab">
								<span class="d-block d-sm-none"><i class="far fa-user"></i></span>
								<span class="d-none d-sm-block">Data Leads</span>
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#profile2" role="tab">
								<span class="d-block d-sm-none"><i class="ion-ios7-checkmark-outline"></i></span>
								<span class="d-none d-sm-block">History Follow Up</span>
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="tab" href="#lam" role="tab">
								<span class="d-block d-sm-none"><i class="far fa-file-alt"></i></span>
								<span class="d-none d-sm-block">Data Lampiran</span>
							</a>
						</li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane active p-3" id="home2" role="tabpanel">
							<form class="" action="<?= base_url('Leads/update_detail') ?>" method="post">
								<!-- ID Ticket -->
								<input type="hidden" name="id_ticket" value="<?= $ticket->id_ticket ?>" id="id_ticket">
								<!-- ID Mapping Leads -->
								<input type="hidden" name="id_mapping_leads" id="id_mapping_leads" value="<?= $data->id_mapping_leads ?>">
								<!-- ID Leads -->
								<input type="hidden" name="id_leads" id="id_leads" value="<?= $data->id_leads ?>">
								<!-- ID Mapping Partner -->
								<input type="hidden" name="id_mapping" id="id_mapping" value="<?= $data->id_mapping ?>">
								<!-- ID Agent -->
								<input type="hidden" name="id_agent" id="id_agent" value="<?= $data->id_agent ?>">
								<!-- ID User -->
								<input type="hidden" name="id_user" id="id_user" value="<?= $this->fungsi->user_login()->id_user ?>">
								<!-- ID Branch -->
								<input type="hidden" name="id_branch" id="id_branch" value="<?= $this->fungsi->user_login()->id_branch ?>">
								<!-- ID Branch -->
								<input type="hidden" id="id_cross_branch" value="<?= $data->cabang_cross ?>">
								<!-- Post Redirect halaman ke form -->
								<input type="hidden" name="redirect" value="<?= uri_string() ?>">
								<?php $cabang_asal = $this->fungsi->user_login()->id_branch; ?>
								<div class="">
									<div class="form-row">
										<div class="col-md-12">
											<div class="form-group ml-3 mr-3">
												<label>Nama Lengkap</label>
												<input type="text" class="form-control placement text-size" name="nama_konsumen" id="nama_konsumen" value="<?= $data->nama_konsumen ?>" <?= $cabang_asal == $data->cabang_cross ? 'readonly' : '' ?> required placeholder="Nama Lengkap" minlength="16" maxlength="16">
											</div>
										</div>
									</div>
									<div class="form-row text-size">
										<div class="col-md-6">
											<div class="form-group text-size ml-3 mr-3">
												<label>Nomor KTP</label>
												<input type="phone" class="form-control placement number-only text-size" name="no_ktp" id="no_ktp" value="<?= $data->no_ktp ?>" <?= $cabang_asal == $data->cabang_cross ? 'readonly' : '' ?> required placeholder="0000 0000 0000 0000" minlength="16" maxlength="16">
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group text-size ml-3 mr-3">
												<label>Pakah Ada NPWP?</label><br>
												<div class="form-check form-check-inline mt-2">
													<input class="form-check-input" type="radio" name="npwp" id="npwp" required value="Tidak Ada">
													<label class="form-check-label">
														Tidak Ada
													</label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="npwp" id="npwp" required value="Ada">
													<label class="form-check-label">
														Ada
													</label>
												</div>
											</div>
										</div>
									</div>
									<div class="form-row npwp-form">
										<div class="col-md-12">
											<div class="form-group ml-3 mr-3">
												<label>Nomor NPWP</label>
												<input type="phone" class="form-control text-size placement number-only <?= form_error('') ? 'is-invalid' : '' ?>" name="no_npwp" id="no_npwp" value="<?= set_value('no_ktp') ?>" required placeholder="00 000 000 0 000 000" minlength="15" maxlength="15" />
												<?= form_error('') ?>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6">
											<div class="form-group text-size ml-3 mr-3">
												<label>Nomor handphone</label>
												<input type="text" class="form-control placement number-only text-size" name="telepon" id="telepon" value="<?= $data->telepon ?>" <?= $cabang_asal == $data->cabang_cross ? 'readonly' : '' ?> required placeholder="0896 5533 985" maxlength="15">
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group ml-3 mr-3">
												<label>Tanggal Lahir</label>
												<input type="date" class="form-control text-size" name="tanggal_lahir" id="tanggal_lahir" placeholder="Tanggal lahir">
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6">
											<div class="form-group ml-3 mr-3">
												<label>Pendidikan</label>
												<select class="form-control text-size" name="pendidikan" id="pendidikan" required>
													<option selected value="">Pilih Pendidikan</option>
													<option value="SD">SD</option>
													<option value="SLTP">SLTP</option>
													<option value="SMU">SMU</option>
													<option value="SLTA">SLTA</option>
													<option value="STM">STM</option>
													<option value="SMEA">SMEA</option>
													<option value="D1">D1</option>
													<option value="D2">D2</option>
													<option value="D3">D3</option>
													<option value="S1">S1</option>
													<option value="S2">S2</option>
													<option value="S3">S3</option>
												</select>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group ml-3 mr-3">
												<label>Status Pernikahan</label>
												<select class="form-control text-size" name="status_pernikahan" id="status_pernikahan" required>
													<option selected value="">Pilih Status Pernikahan</option>
													<option value="Sudah Menikah">Sudah Menikah</option>
													<option value="Belum Menikah">Belum Menikah</option>
													<option value="Janda / Duda - Meninggal">Janda / Duda - Meninggal</option>
													<option value="Janda / Duda - Cerai">Janda / Duda - Cerai</option>
												</select>
											</div>
										</div>
									</div>
									<div class="form-row pasangan">
										<div class="col-md-12">
											<div class="form-group ml-3 mr-3">
												<label>Nama Pasangan</label>
												<input type="text" class="form-control text-size" name="nama_pasangan" id="nama_pasangan" placeholder="Nama Pasangan">
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6">
											<div class="form-group text-size ml-3 mr-3">
												<label>Jenis Rumah</label><br>
												<div class="form-check form-check-inline mt-2">
													<input class="form-check-input" type="radio" name="jenis_rumah" id="jenis_rumah" required value="Semi Permanent">
													<label class="form-check-label">
														Semi Permanent
													</label>
												</div>
												<div class="form-check form-check-inline">
													<input class="form-check-input" type="radio" name="jenis_rumah" id="jenis_rumah" required value="Permanent">
													<label class="form-check-label">
														Permanent
													</label>
												</div>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group ml-3 mr-3">
												<label>Luas Bangunan Rumah</label>
												<select class="form-control text-size" name="luas_bangunan" id="luas_bangunan" required>
													<option selected value="">Pilih Kategori Luas Bangunan Rumah</option>
													<option value="< 60 M2">
														< 60 M2</option> <option value="60 - 100 M2">60 - 100 M2
													</option>
													<option value="100 - 150 M2">100 - 150 M2</option>
													<option value="> 150 M2">> 150 M2</option>
												</select>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6">
											<div class="form-group ml-3 mr-3">
												<label>Lokasi Rumah</label>
												<select class="form-control text-size" name="lokasi_rumah" id="lokasi_rumah" required>
													<option selected value="">Pilih Kategori Lokasi Rumah</option>
													<option value="Non Perumahan - Tidak bisa Lewat Mobil">Non Perumahan - Tidak bisa Lewat Mobil</option>
													<option value="Non Perumahan - Jalan Satu Mobil">Non Perumahan - Jalan Satu Mobil</option>
													<option value="Non Perumahan - Jalan Dua Mobil">Non Perumahan - Jalan Dua Mobil</option>
													<option value="Perumahan - Tidak Bisa Lewat Mobil">Perumahan - Tidak Bisa Lewat Mobil</option>
													<option value="Perumahan - Jalan Satu Mobil">Perumahan - Jalan Satu Mobil</option>
													<option value="Perumahan - Jalan Dua Mobil">Perumahan - Jalan Dua Mobil</option>
												</select>
											</div>
										</div>
										<div class="col-md-6">
											<div class="col-md-12">
												<div class="form-group">
													<label>Status Konsumen</label>
													<select class="form-control text-size" name="status_konsumen" id="status_konsumen" required>
														<option selected value="">Pilih Status Konsumen</option>
														<option value="New Customer">New Customer</option>
														<option value="RO Expire">RO Expire</option>
														<option value="RO Active">RO Active</option>
													</select>
												</div>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-12">
											<div class="form-group ml-3 mr-3">
												<label>Asal Aplikasi</label>
												<select class="form-control text-size" name="soa" id="soa" required>
													<option selected value="">Pilih Source Aplikasi</option>
													<option <?= set_value('soa') == 'Agent BA' ? 'selected' : '' ?> value="Agent BA">Agent / BA</option>
													<option <?= set_value('soa') == 'EGC' ? 'selected' : '' ?> value="EGC">EGC</option>
													<option <?= set_value('soa') == 'CGC' ? 'selected' : '' ?> value="CGC">CGC</option>
													<option <?= set_value('soa') == 'Tele Marketing' ? 'selected' : '' ?> value="Tele Marketing">Tele Sales</option>
													<option <?= set_value('soa') == 'CMS' ? 'selected' : '' ?> value="CMS">CMS</option>
													<option <?= set_value('soa') == 'Sharia Head' ? 'selected' : '' ?> value="Sharia Head">Sharia Head</option>
													<option <?= set_value('soa') == 'HO - Product' ? 'selected' : '' ?> value="HO - Product">HO - Product</option>
													<option <?= set_value('soa') == 'Tour & travel' ? 'selected' : '' ?> value="Tour & travel">Tour & travel</option>
													<option <?= set_value('soa') == 'Penyedia Jasa' ? 'selected' : '' ?> value="Penyedia Jasa">Penyedia Jasa / Barang</option>
												</select>
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-12 event text-size">
											<div class="form-group ml-3 mr-3">
												<label>Nama Event</label>
												<input type="text" class="form-control text-size" value="<?= $data->nama_event ?>" name="nama_event" id="nama_event" placeholder="Input Nama Event">
											</div>
										</div>
										<div class="col-md-12 form-agent text-size mb-3">
											<div class="ml-3 mr-3">
												<label class="agent">Pilih Data Agent</label>
												<div class="input-group">
													<input type="text" class="form-control text-size readonly pointer" name="data_agent" id="data_agent" value="<?= $data->nama_agent ?>" aria-label="Recipient's username" aria-describedby="button-addon2">
													<div class="input-group-append">
														<button class="btn btn-primary btn-data text-size" type="button" id="btn-data-agent" data-toggle="modal" data-target="" <?= $cabang_asal == $data->cabang_cross ? 'disabled' : '' ?>>Cari</button>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-12 form text-size mb-3">
											<div class="ml-3 mr-3">
												<label class="travel">Pilih Data Travel</label>
												<label class="jasa">Pilih Data Penyedia Jasa</label>
												<label class="vendor">Pilih Data Partner</label>
												<div class="input-group">
													<input type="text" class="form-control text-size readonly pointer" name="data_partner" id="data_partner" value="<?= $data->nama_partner ?>" aria-label="Recipient's username" aria-describedby="button-addon2">
													<div class="input-group-append">
														<button class="btn btn-primary btn-data text-size" type="button" id="btn-data" data-toggle="modal" data-target="" <?= $cabang_asal == $data->cabang_cross ? 'disabled' : '' ?>>Cari</button>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-6 nik text-size">
											<div class="form-group ml-3 mr-3">
												<label>NIK</label>
												<input type="phone" class="form-control text-size placement number-only" name="nik_egc" id="nik_egc" value="<?= $data->nik_egc ?>" <?= $cabang_asal == $data->cabang_cross ? 'readonly' : '' ?> placeholder="072104" minlength="6" maxlength="7" />
											</div>
										</div>
										<div class="col-md-6 posisi text-size">
											<div class="form-group ml-3 mr-3">
												<label>Posisi</label>
												<input type="text" class="form-control text-size" name="posisi_egc" id="posisi_egc" value="<?= $data->posisi_egc ?>" <?= $cabang_asal == $data->cabang_cross ? 'readonly' : '' ?> placeholder="Input Posisi">
											</div>
										</div>
										<div class="col-md-12 cabang">
											<div class="form-group ml-3 mr-3">
												<label>Cabang</label>
												<input type="text" class="form-control text-size" name="cabang_egc" id="cabang_egc" value="<?= $data->cabang_egc ?>" <?= $cabang_asal == $data->cabang_cross ? 'readonly' : '' ?> placeholder="Input Cabang">
											</div>
										</div>
										<div class="col-md-6 kontrak-ro">
											<div class="form-group ml-3 mr-3">
												<label>Nomor Kontrak</label>
												<input type="phone" class="form-control text-size placement number-only" name="nomor_kontrak" id="nomor_kontrak" value="<?= $data->nomor_kontrak ?>" <?= $cabang_asal == $data->cabang_cross ? 'readonly' : '' ?> placeholder="0878837741" minlength="10" maxlength="10" />
											</div>
										</div>
										<div class="col-md-6 konsumen-ro">
											<div class="form-group ml-3 mr-3">
												<label>Nama Konsumen</label>
												<input type="text" class="form-control text-size" name="referral_konsumen" id="referral_konsumen" value="<?= $data->referral_konsumen ?>" <?= $cabang_asal == $data->cabang_cross ? 'readonly' : '' ?> placeholder="Input Nama konsumen">
											</div>
										</div>
									</div>
									<div class="form-row">
										<div class="col-md-6">
											<div class="form-group ml-3 mr-3">
												<label>Activity</label>
												<select class="form-control text-size" name="activity" id="activity" required>
													<option selected disabled value="">Pilih Kategori Activity</option>
													<optionm value="Direct Selling">Direct Selling</optionm>
													<option value="Tele call">Tele call</option>
													<option value="Digital Marketing">Digital Marketing</option>
													<option value="Sosial Media">Sosial Media</option>
													<option value="Website">Website</option>
													<option value="Event Promotion">Event Promotion</option>
													<option value="Walk In Branch">Walk In Branch</option>
													<option value="Surat Penawaran">Surat Penawaran</option>
													<option value="Blast WA / SMS">Blast WA / SMS</option>
													<option value="Email Marketing">Email Marketing</option>
												</select>
											</div>
										</div>
										<div class="col-md-6 text-size">
											<fieldset <?= $cabang_asal == $data->cabang_cross ? 'disabled' : '' ?>>
												<div class="form-group ml-3 mr-3">
													<label>Konsumen Cross Branch?</label><br>
													<div class="form-check form-check-inline mt-2">
														<input class="form-check-input cross_branch text-size" type="radio" name="cross_branch" <?= $data->cross_branch == 'Ya' ? 'checked' : '' ?> required value="Ya">
														<label class="form-check-label text-size">
															Ya
														</label>
													</div>
													<div class="form-check form-check-inline">
														<input class="form-check-input cross_branch text-size" type="radio" name="cross_branch" <?= $data->cross_branch == 'Tidak' ? 'checked' : '' ?> required value="Tidak">
														<label class="form-check-label text-size">
															Tidak
														</label>
													</div>
												</div>
											</fieldset>
											<input type="hidden" name="cross_branch" value="<?= $data->cross_branch ?>" <?= $cabang_asal == $data->id_branch ? 'disabled' : '' ?>>
										</div>
									</div>

									<div class="form-row">
										<div class="col-md-12 text-size">
											<fieldset <?= $cabang_asal == $data->cabang_cross ? 'disabled' : '' ?>>
												<div id="hide" class="form-group ml-3 mr-3">
													<label>Pilih cabang</label>
													<select class="form-control text-size" name="cabang_cross" id="cabang_cross" <?= $cabang_asal == $data->cabang_cross ? 'disabled' : '' ?>>
														<option selected disabled value="">Pilih Cabang</option>
														<?php foreach ($branches->result() as $branch) { ?>
															<?php if ($branch->id_branch == $this->fungsi->user_login()->id_branch && $cabang_asal == $data->id_branch) continue; ?>
															<option <?= $branch->id_branch == $data->cabang_cross ? 'selected' : '' ?> <?= $branch->id_branch == $cabang_asal ? 'disabled' : '' ?> value="<?= $branch->id_branch ?>"><?= $branch->nama_cabang ?></option>
														<?php } ?>
													</select>
												</div>
											</fieldset>
											<input type="hidden" name="cabang_cross" value="<?= $data->cabang_cross ?>" <?= $cabang_asal == $data->id_branch ? 'disabled' : '' ?>>
										</div>
									</div>
								</div>
								<div class="form-group mb-0 mt-2 float-right btn-maintain">
									<?php
									$level = $this->fungsi->user_login()->level;
									if (
										($level != 1)  && (($level == 2 && $ticket->status_approval == 0) || ($level == 3 && $ticket->status_approval == 1) || ($level == 4 && $ticket->status_approval == 2)) && (($this->fungsi->user_login()->id_branch == $data->id_branch) || $level == 4)
									) {
									?>
										<a class="btn btn-info text-size" onclick="return confirm('Apakah Anda yakin MENYETUJUI data tiket ini?')" href="<?= base_url('ticket/approve_status/' . $ticket->id_ticket) ?>">Approve</a>
									<?php } ?>
									<?php if ($level == 4 && $ticket->status_approval == 2) { ?>
										<a class="btn btn-danger text-size" onclick="return confirm('Apakah Anda yakin MENOLAK data tiket ini?')" href=" <?= base_url('ticket/reject_status/' . $ticket->id_ticket) ?>">Reject</a>
									<?php } ?>
									<?php if ($level < 4) { ?>
										<button type="submit" onclick="return confirm('Mohon pastikan data yang diisi sudah benar!')" class="btn btn-primary waves-effect waves-light text-size">
											Simpan
										</button>
									<?php } ?>
								</div>
							</form>
						</div>

						<div class="tab-pane p-3" id="profile2" role="tabpanel">
							<h4 class="mt-0 header-title mb-4">Timeline History Follow Up</h4>
							<div class="row">
								<div class="col-md-6">
									<ol class="activity-feed mb-0">
										<?php
										if ($follow_up->num_rows() > 0) {
											foreach ($follow_up->result() as $data) {
										?>
												<li class="feed-item text-size">
													<div class="feed-item-list">
														<span class="activity-text text-primary"><b>Follow Up By <?= $data->follow_up_by ?></b></span><br>
														<span class="activity-text"><b>Oleh <?= $data->name ?></b></span>
														<span class="date"><?= $data->tanggal_follow_up ?></span>
														<span class="activity-text"><?= $data->catatan ?></span>
													</div>
												</li>
											<?php
											}
										} else { ?>
											<p class="text-muted m-b-10 text-size text-center">Tidak Ada Data</p>
										<?php } ?>
									</ol>
								</div>
							</div>
						</div>

						<div class="tab-pane p-3" id="lam" role="tabpanel">
							<div class="row">
								<div class="col-md-12">
									<h4 class="mt-0 header-title mb-4">Data Lampiran</h4>


									<hr>
								</div>
								<div class="col-md-12">
									<form action="" method="POST" enctype="multipart/form-data">
										<input type="hidden" name="id_partner" value="">
										<input type="hidden" name="redirect" value="">
										<h4 class="mt-0 header-title mb-4">Tambah Data Lampiran</h4>
										<div class="form-group element text-size">
											<label>Lampirkan Data</label><br>
											<input type="file" name="tambah_lampiran[]" id="upload_file1" required>
										</div>
										<hr>
										<div id="moreImageUpload"></div>
										<div class="clear"></div>
										<div id="moreImageUploadLink" style="display:none;" class="float-right">
											<a class="btn btn-secondary mr-1" href="javascript:void(0);" id="attachMore">tambah Form lampiran</a>
											<button class="btn btn-primary mr-3">Simpan</button>
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="col-lg-4">
		<div class="sticky">
			<div class="card height">
				<div class="card-body">
					<div class="card-contents">
						<ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
							<li class="nav-item">
								<a class="nav-link active" data-toggle="tab" href="#home1" role="tab">
									<span class="d-block d-sm-none"><i class="far fa-newspaper"></i></span>
									<span class="d-none d-sm-block">Status</span>
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" data-toggle="tab" href="#profile1" role="tab">
									<span class="d-block d-sm-none"><i class="far fa-comment-dots"></i></span>
									<span class="d-none d-sm-block">Comment</span>
								</a>
							</li>
						</ul>

						<div class="tab-content">
							<div class="tab-pane active p-3" id="home1" role="tabpanel">
								<h6 class="header-title web mt-0 mb-0">AKTIVITAS TERAKHIR</h6>
								<div class="boxx overflow-auto web">
									<?php if ($activities->num_rows() > 0) {
										foreach ($activities->result() as $activity) { ?>
											<div class="inbox-wid">
												<div class="inbox-item">
													<table class="text-size">
														<tr>
															<td>
																<p class="inbox-item-author mt-0 mb-0"><i class="dripicons-clock"></i>&nbsp;</p>
															</td>
															<td>
																<p class="inbox-item-author mt-0 mb-1 text-size"><b><?= $activity->activity ?></b></p>
															</td>
															<td>
																<p class="inbox-item-date text-muted mt-1 text-size"><?= $activity->tanggal_activity ?></p>
															</td>
														</tr>
														<tr>
															<td>

															</td>
															<td>
																<p class="inbox-item-text text-muted mb-0 text-size">Oleh&nbsp;&nbsp;<?= $activity->name ?> (<?= $activity->jabatan ?>) - <?= $activity->nama_cabang ?></p>
															</td>
															<td>

															</td>
														</tr>
													</table>
												</div>
											</div>
										<?php
										}
									} else { ?>
										<p class="text-muted m-b-10 text-size">Tidak Ada Data</p>
									<?php } ?>
								</div>
								<div class="boxx mobile">
									<h6 class="header-title mt-0 mb-0">AKTIVITAS TERAKHIR</h6>
									<?php if ($activities->num_rows() > 0) {
										foreach ($activities->result() as $activity) { ?>
											<div class="inbox-wid">
												<div class="inbox-item">
													<table class="text-size">
														<tr>
															<td>
																<p class="inbox-item-author mt-0 mb-1"><i class="dripicons-clock"></i>&nbsp;</p>
															</td>
															<td>
																<p class="inbox-item-author mt-0 mb-1"><b><?= $activity->activity ?></b></p>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>
																<p class="inbox-item-text text-muted mb-0 text-size">Oleh&nbsp;&nbsp;<?= $activity->name ?> (<?= $activity->jabatan ?>) - <?= $activity->nama_cabang ?></p>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>
																<p class="inbox-item-text text-muted mb-0"><?= $activity->tanggal_activity ?></p>
															</td>
														</tr>
													</table>
												</div>
											</div>
										<?php
										}
									} else { ?>
										<p class="text-muted m-b-10 text-size">Tidak Ada Data</p>
									<?php } ?>
								</div>

								<!-- <div class="web mt-2">
									<h6 class="header-title mb-0 mt-0">STATUS LEADS</h6>
									<div class="boxxx overflow-auto">
										<?php if ($ticket->status_approval == 5) { ?>
											<div class="inbox-wid">
												<div class="inbox-item">
													<table>
														<tr>
															<td>
																<p class="inbox-item-author mt-0 mb-1"><i class="mdi mdi-account-check"></i>&nbsp;</p>
															</td>
															<td>
																<p class="inbox-item-author mt-0 mb-1 text-size"><b>Terverifikasi</b></p>
															</td>
															<td>
																<p class="inbox-item-date text-muted mt-1 mb-0 text-size"><?= $ticket->tanggal_completed ?></p>
															</td>
														</tr>
														<tr>
															<td>
															</td>
															<td>
																<p class="inbox-item-text text-muted mb-0 text-size">Oleh&nbsp;&nbsp;<?= $ticket->nama_user_completed ?></p>
															</td>
															<td>
															</td>
														</tr>
													</table>
												</div>
											</div>
										<?php } else { ?>
											<div class="inbox-wid hide">
												<div class="inbox-item">
													<table>
														<tr>
															<td>
																<p class="inbox-item-author mt-0 mb-1"><i class="mdi mdi-timer-sand"></i>&nbsp;</p>
															</td>
															<td>
																<p class="inbox-item-author mt-0 mb-1 text-size"><b>Belum Diverifikasi</b></p>
															</td>
															<td></td>
														</tr>
													</table>
												</div>
											</div>
										<?php } ?>
										<?php if ($ticket->ttd_pks == 'Ya' && $ticket->form_mou != NULL) { ?>
											<div class="inbox-wid">
												<div class="inbox-item">
													<table>
														<tr>
															<td>
																<p class="inbox-item-author mt-0 mb-1"><i class="mdi mdi-account-check"></i>&nbsp;</p>
															</td>
															<td>
																<p class="inbox-item-author mt-0 mb-1 text-size"><b>Sudah tanda tangan Kerjasama</b></p>
															</td>
															<td>
																<p class="inbox-item-date text-muted mt-1 mb-0 text-size"><?= $ticket->tanggal_verified_ttd ?></p>
															</td>
														</tr>
														<tr>
															<td></td>
															<td>
																<p class="inbox-item-text text-muted mb-0 text-size">Oleh&nbsp;&nbsp;<?= $ticket->nama_user_verified ?></p>
															</td>
															<td></td>
														</tr>
													</table>
												</div>
											</div>
										<?php } ?>
										<?php if (($this->fungsi->user_login()->level < 4) && ($ticket->form_mou == NULL || $ticket->form_mou == '')) { ?>
											<div class="inbox-wid">
												<div class="inbox-item">
													<table>
														<tr>
															<td>

															</td>
															<td>
																<p class="inbox-item-author mt-0 mb-1 ml-3 text-size"><b>Kerjasama?</b></p>
															</td>
														</tr>
														<tr>
															<td>

															</td>
															<td>
																<div class="form-group ml-3">
																	<div class="form-check form-check-inline">
																		<input class="form-check-input ttd_pks" type="radio" name="ttd_pks" <?= $ticket->ttd_pks == 'Ya' ? 'checked' : '' ?> value="Ya">
																		<label class="form-check-label">
																			Ya
																		</label>
																	</div>
																	<div class="form-check form-check-inline">
																		<input class="form-check-input ttd_pks" type="radio" name="ttd_pks" <?= $ticket->ttd_pks == 'Tidak' ? 'checked' : '' ?> value="Tidak">
																		<label class="form-check-label">
																			Tidak
																		</label>
																	</div>
																</div>
																<div id="form_mou" class="form-group ml-3">
																	<form action="<?= base_url('ticket/upload_mou') ?>" method="post" enctype="multipart/form-data">
																		<input type="hidden" name="id_ticket" value="<?= $ticket->id_ticket ?>">
																		<input type="hidden" name="redirect" value="<?= uri_string() ?>">
																		<div class="form-group mr-2">
																			<label>Form MOU</label>
																			<input type="file" name="upload_mou" class="filestyle" data-buttonname="btn-secondary">
																		</div>
																		<div class="form-group">
																			<button class="btn btn-success" id="btn_upload" type="submit">Upload</button>
																		</div>
																	</form>
																</div>
															</td>
														</tr>
													</table>
												</div>
											</div>
										<?php } ?>
									</div>
								</div>

								<div class="mobile">
									<h6 class="header-title mb-0">STATUS PARTNER</h6>
									<?php if ($ticket->status_approval == 5) { ?>
										<div class="inbox-wid">
											<div class="inbox-item">
												<table class="text-size">
													<tr>
														<td>
															<p class="inbox-item-author mt-0 mb-1"><i class="mdi mdi-account-check"></i>&nbsp;</p>
														</td>
														<td>
															<p class="inbox-item-author mt-0 mb-1"><b>Terverifikasi</b></p>
														</td>
													</tr>
													<tr>
														<td></td>
														<td>
															<p class="inbox-item-text text-muted mb-0">Oleh&nbsp;&nbsp;<?= $ticket->nama_user_completed ?></p>
														</td>
													</tr>
													<tr>
														<td></td>
														<td>
															<p class="inbox-item-text text-muted"><?= $ticket->tanggal_completed ?></p>
														</td>
													</tr>
												</table>
											</div>
										</div>
									<?php } else { ?>
										<div class="inbox-wid">
											<div class="inbox-item">
												<table class="text-size">
													<tr>
														<td>
															<p class="inbox-item-author mt-0 mb-1"><i class="mdi mdi-timer-sand"></i>&nbsp;</p>
														</td>
														<td>
															<p class="inbox-item-author mt-0 mb-1"><b>Belum Diverifikasi</b></p>
														</td>
													</tr>
												</table>
											</div>
										</div>
									<?php } ?>
									<?php if ($ticket->ttd_pks == 'Ya' && $ticket->form_mou != NULL) { ?>
										<div class="inbox-wid">
											<div class="inbox-item">
												<table class="text-size">
													<tr>
														<td>
															<p class="inbox-item-author mt-0 mb-1"><i class="mdi mdi-account-check"></i>&nbsp;</p>
														</td>
														<td>
															<p class="inbox-item-author mt-0 mb-1"><b>Sudah tanda tangan Kerjasama</b></p>
														</td>
													</tr>
													<tr>
														<td></td>
														<td>
															<p class="inbox-item-text text-muted mb-0">Oleh&nbsp;&nbsp;<?= $ticket->nama_user_verified ?></p>
														</td>
													</tr>
													<tr>
														<td></td>
														<td>
															<p class="inbox-item-text text-muted"><?= $ticket->tanggal_verified_ttd ?></p>
														</td>
													</tr>
												</table>
											</div>
										</div>
									<?php } ?>
									<?php if (($this->fungsi->user_login()->level < 4) && ($ticket->form_mou == NULL || $ticket->form_mou == '')) { ?>
										<div class="inbox-wid">
											<div class="inbox-item">
												<table>
													<tr>
														<td>

														</td>
														<td>
															<p class="inbox-item-author mt-0 mb-1 ml-3 text-size"><b>Kerjasama?</b></p>
														</td>
													</tr>
													<tr>
														<td>

														</td>
														<td>
															<div class="form-group ml-3">
																<div class="form-check form-check-inline">
																	<input class="form-check-input ttd_pks" type="radio" name="ttd_pks" <?= $ticket->ttd_pks == 'Ya' ? 'checked' : '' ?> value="Ya">
																	<label class="form-check-label">
																		Ya
																	</label>
																</div>
																<div class="form-check form-check-inline">
																	<input class="form-check-input ttd_pks" type="radio" name="ttd_pks" <?= $ticket->ttd_pks == 'Tidak' ? 'checked' : '' ?> value="Tidak">
																	<label class="form-check-label">
																		Tidak
																	</label>
																</div>
															</div>
															<div id="form_mou" class="form-group ml-3">
																<form action="<?= base_url('ticket/upload_mou') ?>" method="post" enctype="multipart/form-data">
																	<input type="hidden" name="id_ticket" value="<?= $ticket->id_ticket ?>">
																	<input type="hidden" name="redirect" value="<?= uri_string() ?>">
																	<div class="form-group mr-2">
																		<label>Form MOU</label>
																		<input type="file" name="upload_mou" class="filestyle" data-buttonname="btn-secondary">
																	</div>
																	<div class="form-group">
																		<button class="btn btn-success" id="btn_upload" type="submit">Upload</button>
																	</div>
																</form>
															</div>
														</td>
													</tr>
												</table>
											</div>
										</div>
									<?php } ?>
								</div> -->

								<h4 class="header-title mt-4 mb-0">LAMPIRAN</h4>
								<div class="inbox-wid">
									<div class="inbox-item">
										<table>
											<tr>
												<td>
													<p class="inbox-item-author mt-0 mb-1"><i class="fas fa-download"></i>&nbsp;</p>
												</td>
												<td>
													<p class="inbox-item-author mt-0 mb-1 text-size"><b><a href="<?= base_url('zip/create_zip/' . $ticket->id_ticket . '/partners') ?>">Download Semua Lampiran</b></a></p>
												</td>
											</tr>
										</table>

									</div>
								</div>
							</div>

							<div class="tab-pane p-3" id="profile1" role="tabpanel">
								<div class="box overflow-auto">
									<?php if ($comments->num_rows() > 0) { ?>
										<?php foreach ($comments->result() as $comment) { ?>
											<div class="media mb-1">
												<a class="image-popup-vertical-fit" href="<?= $comment->foto != '' ? base_url('uploads/foto_profil/' . $comment->foto) : base_url('assets/img/profile-pic.jpg')  ?>" title="Foto Profile.">
													<img class="d-flex align-self-start rounded mr-3" alt="" src="<?= $comment->foto != '' ? base_url('uploads/foto_profil/' . $comment->foto) : base_url('assets/img/profile-pic.jpg')  ?>" height="64" width="64">
												</a>
												<div class="media-body b">
													<p class="mb-0"><b><?= $comment->name ?></b></p>
													<p class="text-size mt-0 mb-0"><?= $comment->tanggal ?></p>
													<p class="text-size mt-0"><?= $comment->comment ?></p>
												</div>
											</div>
											<hr>
										<?php } ?>
									<?php } else { ?>
										<h4 class="text-muted m-b-10 text-size">Tidak Ada Komentar</h4>
									<?php } ?>
								</div>
								<form action="<?= base_url('Comment/save') ?>" method="post">
									<input type="hidden" name="ticket" id="ticket" value="<?= $ticket->id_ticket ?>">
									<input type="hidden" name="uri_string" id="uri_string" value="<?= uri_string() ?>">
									<div class="form-group">
										<label>Comment</label>
										<textarea class="form-control" name="comment" id="comment-text" cols="30" rows="10" required placeholder="tulis comment disini" style="height: 80px;"></textarea>
									</div>
									<button class="btn btn-primary waves-effect waves-light float-right" type="submit" name="process">Kirim</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Modal Mapping Leads -->
<div class="modal fade bd-example-modal-xl" id="modal-leads" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-body" style="height:700px;">
				<div class="modal-header mb-2">
					<h4 class="modal-title">Cari Data Leads</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<table id="" class="datatable-modal table table-striped table-bordered dt-responsive wrap text-size table-modal" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
					<thead>
						<tr>
							<th>
								<div class="text-size">Nama Lengkap</div>
							</th>
							<th>
								<div class="text-size">Nomor Telepon</div>
							</th>
							<th>
								<div class="text-size">Asal Aplikasi</div>
							</th>
							<th>
								<div class="text-size">Produk</div>
							</th>
							<th>
								<div class="text-size">Aksi</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<?php foreach ($mappings->result() as $mapping) { ?>
							<tr>
								<td>
									<div class="text-size"><?= $mapping->nama_konsumen ?></div>
								</td>
								<td>
									<div class="text-size"><?= $mapping->telepon ?></div>
								</td>
								<td>
									<div class="text-size"><?= $mapping->soa ?></div>
								</td>
								<td>
									<div class="text-size"><?= $mapping->produk ?></div>
								</td>
								<td>
									<center><button class="btn btn-primary pilih-leads" data-mapping="<?= $mapping->mapping_id ?>" data-nama="<?= $mapping->nama_konsumen ?>" data-telepon="<?= $mapping->telepon ?>" data-soa="<?= $mapping->soa ?>" data-produk="<?= $mapping->produk ?>" data-detail="<?= $mapping->detail_produk ?>" data-event="<?= $mapping->nama_event ?>" data-kontrak="<?= $mapping->nomor_kontrak ?>" data-referral="<?= $mapping->referral_konsumen ?>" data-nikegc="<?= $mapping->nik_egc ?>" data-posisiegc="<?= $mapping->posisi_egc ?>" data-cabangegc="<?= $mapping->cabang_egc ?>">Pilih</button></center>
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

<!-- Modal partner -->
<div class="modal fade" id="modal-partner" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-body">
				<div class="modal-header mb-2">
					<h4 class="modal-title">Cari Data Partner</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<table id="" class="datatable-modal table table-striped table-bordered dt-responsive wrap text-size table-modal" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
					<thead>
						<tr>
							<th>Name Usaha</th>
							<th>Kategori Produk</th>
							<th>Telepon</th>
							<th>Status</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						<?php foreach ($partners->result() as $partner) { ?>
							<tr>
								<td><?= $partner->nama_usaha ?></td>
								<td><?= $partner->kategori_produk ?></td>
								<td><?= $partner->telepon ?></td>
								<td>
									<?php if ($partner->status == 'draft') { ?>
										<span class="badge badge-secondary">Draft</span>
									<?php } ?>
									<?php if ($partner->status == 'lengkap') { ?>
										<span class="badge badge-success">Lengkap</span>
									<?php } ?>
									<?php if ($partner->status == '') { ?>
										<span class="badge badge-secondary">Mapping</span>
									<?php } ?>
								</td>
								<td>
									<center><button class="btn btn-primary pilih-partner" data-partner="<?= $partner->id_mapping_partner ?>" data-vendor="<?= $partner->nama_usaha ?>">Pilih</button></center>
								</td>
							</tr>
						<?php } ?>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<!-- Modal partner -->

<!-- Modal agent -->
<div class="modal fade" id="modal-agent" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-body">
				<div class="modal-header mb-2">
					<h4 class="modal-title">Cari Data Agent</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<table id="" class="datatable-modal table table-striped table-bordered dt-responsive wrap text-size table-modal" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
					<thead>
						<tr>
							<th>Nama Lengkap</th>
							<th>Telepon</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						<?php foreach ($agents->result() as $agent) { ?>
							<tr>
								<td><?= $agent->nama_lengkap ?></td>
								<td><?= $agent->telepon ?></td>
								<td>
									<center><button class="btn btn-primary pilih-agent" data-agent="<?= $agent->id_agent ?>" data-namaagent="<?= $agent->nama_lengkap ?>">Pilih</button></center>
								</td>
							</tr>
						<?php } ?>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<!-- Modal agent -->

<script>
	$('.travel, .agent, .jasa, .event, .btn-data, .form, .form-agent, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro, .vendor').hide();
	source_leads();
	$('#soa').change(function() {
		source_leads();
		$('#id_partner').val("");
		$('#id_agent').val("");
		$('#nama_vendor').val("").removeAttr("required");
		$('#nama_event').val("");
		$('#data_partner').val("");
		$('#data_agent').val("");
		$('#nik_egc, #cabang_egc, #posisi_egc, #referral_konsumen, #nomor_kontrak').val("");
	})

	function source_leads() {
		if ($('#soa').val() == 'Direct Selling') {
			$('.vendor, .form, .btn-data').show();
			$('#data_partner').attr('placeholder', 'Pilih Nama Partner');
			$('#btn-data').attr('data-target', '#modal-partner');
			$('#data_partner').attr('required', 'required');
			$('#data_agent, #nik_egc, #cabang_egc, #posisi_egc, #referral_konsumen, #nomor_kontrak, #nama_event').removeAttr('required', 'required');
			$('.travel, .agent, .jasa, .event, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro, .form-agent').hide();
		} else if ($('#soa').val() == 'Tour & travel') {
			$('.travel, .form, .btn-data').show();
			$('#data_partner').attr('placeholder', 'Pilih Nama Travel')
			$('#btn-data').attr('data-target', '#modal-partner')
			$('#data_partner').attr('required', 'required');
			$('#data_agent, #nik_egc, #cabang_egc, #posisi_egc, #referral_konsumen, #nomor_kontrak, #nama_event').removeAttr('required', 'required');
			$('.agent, .jasa, .event, .modal-agent, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro, .vendor, .form-agent').hide();
		} else if ($('#soa').val() == 'Penyedia Jasa') {
			$('.jasa, .form, .btn-data').show();
			$('#data_partner').attr('placeholder', 'Pilih Nama Penyedia Jasa')
			$('#btn-data').attr('data-target', '#modal-partner')
			$('#data_partner').attr('required', 'required');
			$('#data_agent, #nik_egc, #cabang_egc, #posisi_egc, #referral_konsumen, #nomor_kontrak, #nama_event').removeAttr('required', 'required');
			$('.agent, .travel, .event, .modal-agent, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro, .vendor, .form-agent').hide();
		} else if ($('#soa').val() == 'Agent BA') {
			$('.vendor, .agent, .form, .agent-form, .btn-data, .form-agent').show();
			$('#data_partner').attr('placeholder', 'Pilih Nama Partner')
			$('#btn-data').attr('data-target', '#modal-partner')
			$('#data_agent').attr('placeholder', 'Pilih Nama Agent')
			$('#btn-data-agent').attr('data-target', '#modal-agent')
			$('#data_partner, #data_agent').attr('required', 'required');
			$('#nik_egc, #cabang_egc, #posisi_egc, #referral_konsumen, #nomor_kontrak, #nama_event').removeAttr('required', 'required');
			$('.travel, .jasa, .event, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro').hide();
		} else if ($('#soa').val() == 'EGC') {
			$('.nik, .posisi, .cabang, .vendor, .form, .btn-data').show();
			$('#data_partner').attr('placeholder', 'Pilih Nama Partner');
			$('#btn-data').attr('data-target', '#modal-partner');
			$('#data_partner, #nik_egc, #cabang_egc, #posisi_egc').attr('required', 'required');
			$('#data_agent, #referral_konsumen, #nomor_kontrak, #nama_event').removeAttr('required', 'required');
			$('.travel, .agent, .jasa, .event, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro, .form-agent').hide();
		} else if ($('#soa').val() == 'RO' || $('#soa').val() == 'CGC') {
			$('.kontrak-ro, .konsumen-ro, .vendor, .form, .btn-data').show();
			$('#data_partner').attr('placeholder', 'Pilih Nama Partner');
			$('#btn-data').attr('data-target', '#modal-partner');
			$('#data_partner, #referral_konsumen, #nomor_kontrak').attr('required', 'required');
			$('#data_agent, #nik_egc, #cabang_egc, #posisi_egc, #nama_event').removeAttr('required', 'required');
			$('.travel, .agent, .jasa, .event, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .form-agent').hide();
			$('.travel, .agent, .jasa, .event, .btn-data, .form, .form-agent, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro, .vendor, #data_partner').val('');
		} else if ($('#soa').val() == 'Digital Marketing') {
			$('.vendor, .form, .btn-data').show();
			$('#data_partner').attr('placeholder', 'Pilih Nama Partner')
			$('#btn-data').attr('data-target', '#modal-partner')
			$('#data_partner').attr('required', 'required');
			$('#data_agent, #nik_egc, #cabang_egc, #posisi_egc, #referral_konsumen, #nomor_kontrak, #nama_event').removeAttr('required', 'required');
			$('.travel, .agent, .jasa, .event, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro, .form-agent').hide();
		} else if ($('#soa').val() == 'Website BFI Syariah') {
			$('.vendor, .form, .btn-data').show();
			$('#data_partner').attr('placeholder', 'Pilih Nama Partner')
			$('#btn-data').attr('data-target', '#modal-partner')
			$('#data_partner').attr('required', 'required');
			$('#data_agent, #nik_egc, #cabang_egc, #posisi_egc, #referral_konsumen, #nomor_kontrak, #nama_event').removeAttr('required', 'required');
			$('.travel, .agent, .jasa, .event, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro, .form-agent').hide();
		} else if ($('#soa').val() == 'Walk In') {
			$('.vendor, .form, .btn-data').show();
			$('#data_partner').attr('placeholder', 'Pilih Nama Partner')
			$('#btn-data').attr('data-target', '#modal-partner')
			$('#data_partner').attr('required', 'required');
			$('#data_agent, #nik_egc, #cabang_egc, #posisi_egc, #referral_konsumen, #nomor_kontrak, #nama_event').removeAttr('required', 'required');
			$('.travel, .agent, .jasa, .event, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro, .form-agent').hide();
		} else if ($('#soa').val() == 'Event Promotion') {
			$('.event, .vendor, .form, .btn-data').show();
			$('#data_partner').attr('placeholder', 'Pilih Nama Partner')
			$('#btn-data').attr('data-target', '#modal-partner')
			$('#data_partner, #nama_event').attr('required', 'required');
			$('#data_agent, #nik_egc, #cabang_egc, #posisi_egc, #referral_konsumen, #nomor_kontrak').removeAttr('required', 'required');
			$('.travel, .agent, .jasa, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro, .form-agent').hide();
		} else if ($('#soa').val() == 'Tele Marketing') {
			$('.vendor, .form, .btn-data').show();
			$('#data_partner').attr('placeholder', 'Pilih Nama Partner')
			$('#btn-data').attr('data-target', '#modal-partner')
			$('#data_partner').attr('required', 'required');
			$('#data_agent, #nik_egc, #cabang_egc, #posisi_egc, #referral_konsumen, #nomor_kontrak, #nama_event').removeAttr('required', 'required');
			$('.travel, .agent, .jasa, .event, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro, .form-agent').hide();
		} else {
			$('.jasa, .travel, .agent, .form, .event, .nik, .posisi, .cabang, .kontrak-cgc, .konsumen-cgc, .kontrak-ro, .konsumen-ro, .form-agent').hide();
			$('#data_partner, #data_agent').removeAttr('required', 'required');
		}
	}

	$(".readonly").keydown(function(e) {
		e.preventDefault();
	});
</script>

<script>
	$("table").on('click', '.pilih-partner', function() {
		$('#id_mapping').val($(this).data('partner'));
		// $('#id_agent').val("");
		$('#nama_vendor').val($(this).data('vendor'));
		$('#data_partner').val($(this).data('vendor'));
		$('#modal-partner').modal('hide');
	})
	$("table").on('click', '.pilih-agent', function() {
		$('#id_agent').val($(this).data('agent'));
		// $('#id_partner').val("");
		$('#data_agent').val($(this).data('namaagent'));
		$('#modal-agent').modal('hide');
	})
	$("table").on('click', '.pilih-leads', function() {
		$('#id_mapping_leads').val($(this).data('mapping'));
		$('#soa').val($(this).data('soa'));
		//EGC
		$('#nik_egc').val($(this).data('nikegc'));
		$('#posisi_egc').val($(this).data('posisiegc'));
		$('#cabang_egc').val($(this).data('cabangegc'));
		//CGC / RO
		$('#nomor_kontrak').val($(this).data('kontrak'));
		$('#referral_konsumen').val($(this).data('referral'));

		//Data Leads
		$('#produk').val($(this).data('produk'));
		$('#telepon').val($(this).data('telepon'));
		$('#data_partner').val($(this).data('vendor'));
		$('#detail_produk').val($(this).data('detail'));
		$('#nama_event').val($(this).data('event'));
		$('#nama_konsumen').val($(this).data('nama'));
		$('#modal-leads').modal('hide');

		source_leads();
	})
</script>

<script>
	$('.kontrak, .pasangan').hide();

	$('#status_konsumen').change(function() {
		if ($('#status_konsumen').val() == "RO Active") {
			$('#soa').val('RO')
			$('.kontrak-ro, .konsumen-ro, .vendor, .form, .btn-data').show();
			$('#data_partner').attr('placeholder', 'Pilih Nama Partner');
			$('#btn-data').attr('data-target', '#modal-partner');
			$('#referral_konsumen, #nomor_kontrak').attr('required', 'required');
			$('#data_agent, #nik_egc, #cabang_egc, #posisi_egc, #nama_event').removeAttr('required', '');
		} else {}

	})

	$('#status_pernikahan').change(function() {
		if ($('#status_pernikahan').val() == "Sudah Menikah") {
			$('.pasangan').show();
			$('#nama_pasangan').attr('required', 'required');
		} else {
			$('.pasangan').hide();
			$('#nama_pasangan').removeAttr('required', ' ');
		}

	})
</script>