<script lang="ts">
	import { resolve } from '$app/paths';
	import type { ApiResponse, User } from '$lib/types';
	import { PUBLIC_URL } from '$env/static/public';

	import logo from '$lib/assets/favicon.svg';

	// Icons
	import SignOutIcon from 'phosphor-svelte/lib/SignOutIcon';
	import UsersIcon from 'phosphor-svelte/lib/UsersIcon';
	import UsbIcon from 'phosphor-svelte/lib/UsbIcon';
	import ListBulletsIcon from 'phosphor-svelte/lib/ListBulletsIcon';
	import ScreencastIcon from 'phosphor-svelte/lib/ScreencastIcon';

	let { me }: { me: ApiResponse<User> } = $props();
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href={resolve('/')} class="btn text-xl btn-ghost">
			<img src={logo} alt="logo" width={24} />
			SchoolBox
		</a>
	</div>
	<div class="flex">
		{#if me.success}
			<ul class="menu menu-horizontal flex items-center px-1">
				<li>
					<a href={resolve('/session')}>
						<ScreencastIcon weight="bold" />
						Session
					</a>
				</li>
				{#if me.data.role === 1}
					<li>
						<a href={resolve('/admin/sessions')}>
							<ListBulletsIcon weight="bold" />
							All Sessions
						</a>
					</li>
					<li>
						<a href={resolve('/admin/users')}>
							<UsersIcon weight="bold" />
							Users
						</a>
					</li>
					<li>
						<a href={resolve('/admin/devices')}>
							<UsbIcon weight="bold" />
							Devices
						</a>
					</li>
				{/if}

				<div class="dropdown dropdown-end">
					<div
						tabindex="0"
						role="button"
						class="h-10 w-10 overflow-hidden rounded-full bg-base-300"
					>
						<img src={me.data.picture_url} alt="Profile" />
					</div>
					<ul tabindex="-1" class="dropdown-content menu z-1 w-52 rounded-box bg-base-300 p-2">
						<li>
							<a href={PUBLIC_URL + '/api/logout'}>
								<SignOutIcon weight="bold" />
								Logout
							</a>
						</li>
					</ul>
				</div>
			</ul>
		{:else}
			<a class="btn border-[#e5e5e5] bg-white text-black" href={PUBLIC_URL + '/api/login'} data-sveltekit-reload rel="external"> 
				<svg
					aria-label="Google logo"
					width="16"
					height="16"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					><g
						><path d="m0 0H512V512H0" fill="#fff"></path><path
							fill="#34a853"
							d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
						></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
						></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
						></path><path
							fill="#ea4335"
							d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
						></path></g
					></svg
				>
				Login with Google
			</a>
		{/if}
	</div>
</div>
