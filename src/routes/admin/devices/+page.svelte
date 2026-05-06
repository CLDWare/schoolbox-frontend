<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

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
				<button class="btn btn-soft btn-primary">
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
							<button class="btn btn-ghost btn-error">
								<LinkBreakIcon weight="bold" />
								Unlink
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<p>{data.devices.message}</p>
{/if}
