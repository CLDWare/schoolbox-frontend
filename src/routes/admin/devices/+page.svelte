<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let link_device: HTMLDialogElement = $state();
	// icons
	import PencilIcon from 'phosphor-svelte/lib/PencilIcon';
	import LinkIcon from 'phosphor-svelte/lib/LinkIcon';
	import LinkBreakIcon from 'phosphor-svelte/lib/LinkBreakIcon';
</script>

{#if data.devices.success}
	<div class="mx-auto mt-4 max-w-7xl overflow-x-auto">
		<div class="flex items-center">
			<div class="flex-1"></div>
			<div>
				<button class="btn btn-ghost btn-primary">Relink A Device</button>
				<button onclick={() => link_device.showModal()} class="btn btn-soft btn-primary">
					<LinkIcon weight="bold" />
					Link New Device
				</button>
			</div>
		</div>
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th>ID</th>
					<th>Active Session</th>
					<th>Room</th>
					<th>Last Seen</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each data.devices.data as device (device.id)}
					<tr>
						<th>{device.id}</th>
						<td>{device.active_session_id ?? 'None'}</td>
						<td>
							<!-- TODO hook up device room edit here -->
							<div class="flex items-center rounded-box bg-base-100 p-2 hover:cursor-pointer">
								<PencilIcon weight="bold" class="mr-2" />
								{device.room ?? 'None'}
							</div>
						</td>
						<td>{device.last_seen}</td>
						<td>
							<form method="POST" action="?/unlink">
								<input type="hidden" name="device_id" value={device.id} />
								<button
									onclick={(e) => {
										if (!confirm('Are you sure?')) e.preventDefault();
									}}
									class="btn btn-ghost btn-error"
								>
									<LinkBreakIcon weight="bold" />
									Unlink
								</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!--Modals -->
	<dialog bind:this={link_device} class="modal modal-bottom sm:modal-middle">
		<div class="modal-box">
			<h3 class="text-lg font-bold">Link a new device</h3>
			<p class="py-4">Please input the pin shown on your device below.</p>
			<form method="POST" action="?/link">
				<input
					name="pin"
					class="validator input"
					type="text"
					pattern="[0-9][0-9][0-9][0-9]"
					inputMode="numeric"
					placeholder="1234"
					required
				/>
				<div class="validator-hint hidden">Please enter a 4 digit pin</div>
				<div class="modal-action">
					<button type="submit" class="btn btn-soft btn-primary">
						<LinkIcon weight="bold" />
						Link
					</button>
				</div>
			</form>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
{:else}
	<p>{data.devices.message}</p>
{/if}
