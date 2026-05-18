<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

{#if data.user.success}
	<table class="table">
		<thead>
			<tr>
				<th>ID</th>
				<th>User</th>
				<th>Role</th>
				<th>Last Seen</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each data.user.data as user (user.id)}
				<tr>
					<th>{user.id}</th>
					<th>
						<div class="avatar mr-2 size-10 overflow-hidden rounded-full">
							<img src={user.picture_url} alt="Profile" />
						</div>
						{user.display_name}
					</th>
					<th></th>
					<th></th>
					<th></th>
				</tr>
			{/each}
		</tbody>
	</table>
	{data.user.data}
{:else}
	{data.user.message}
{/if}
