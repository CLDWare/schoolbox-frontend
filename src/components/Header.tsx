import { useUser } from '../hooks/useUser.ts';

export function Header() {
    const { user, loading } = useUser();

    return (
        <div class="navbar bg-base-100 shadow-sm">
            <div class="flex-1">
                <a href="/" class="btn btn-ghost text-xl">SchoolBox</a>
            </div>

            <div class="flex-none pr-4 flex items-center">
                {loading ? (
                    <div class="loading loading-spinner loading-sm"></div>
                ) : user ? (
                    user.role === 0 ? (
                        <div class="flex items-center gap-2">
                            <ul class="menu menu-horizontal px-1">
                                <li><a class="btn" href="/session">Session</a></li>
                                <li><button type="button" onClick={() => globalThis.location.href = 'http://localhost:8000/api/logout'} class="btn">Logout</button></li>
                            </ul>
                            <ProfilePicture pictureUrl={user.picture_url} />
                        </div>
                    ) : (
                        <div class="flex items-center gap-4">
                            <ul class="menu menu-horizontal px-1">
                                <li><a class="btn" href="/session">Session</a></li>
                                <li><a class="btn" href="/admin/users">Users</a></li>
                                <li><a class="btn" href="/admin/devices">Devices</a></li>
                                <li><button type="button" onClick={() => globalThis.location.href = 'http://localhost:8000/api/logout'} class="btn">Logout</button></li>
                            </ul>
                            <ProfilePicture pictureUrl={user.picture_url} />
                        </div>
                    )
                ) : (
                    <button type="button" onClick={() => globalThis.location.href = 'http://localhost:8080/login'} class="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                )}
            </div>
        </div>
    );
}

export function ProfilePicture({ pictureUrl }: { pictureUrl: string }) {
    return (
        <div class="avatar avatar-placeholder">
            <div class="bg-base text-neutral-content w-10 rounded-full">
                <img src={pictureUrl} alt="Profile Picture" />
            </div>
        </div>
    );
}