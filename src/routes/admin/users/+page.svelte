<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	import HardDrivesIcon from 'phosphor-svelte/lib/HardDrivesIcon';

	import { timeAgo } from '$lib/time';
</script>

{#if data.user.success}
	<table class="table">
		<thead>
			<tr>
				<th>ID</th>
				<th>User</th>
				<th>Email</th>
				<th>Join Date</th>
				<th>Role</th>
			</tr>
		</thead>
		<tbody>
			{#each data.user.data as user (user.id)}
				<tr>
					<th>{user.id}</th>
					<th>
						<div class="avatar mr-2 size-8 overflow-hidden rounded-full">
							<img src={user.picture_url} alt="Profile" />
						</div>
						{user.display_name}
					</th>
					<th>{user.email}</th>
					<th>{timeAgo(user.joinedAt)}</th>
					<th>
						{#if user.role === 1}
							<div class="badge badge-soft badge-info">
								<HardDrivesIcon weight="bold" />
								Admin
							</div>
						{/if}
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
	{data.user.data}
{:else}
	{data.user.message}
{/if}
