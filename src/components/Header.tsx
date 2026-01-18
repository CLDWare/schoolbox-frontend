import { useUser } from '../hooks/useUser.ts';

export function Header() {
    const { user, loading } = useUser();

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost text-xl">SchoolBox</a>
            </div>

            <div className="flex-none pr-4">
                {loading ? (
                    <div className="loading loading-spinner loading-sm"></div>
                ) : user ? (
                    user.role === 0 ? (
                        <div className="flex items-center gap-2">
                            <div class="avatar avatar-placeholder">
                                <div class="bg-primary text-neutral-content w-10 rounded-full">
                                    <span>{user.display_name.charAt(0).toUpperCase()}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
                                <div class="avatar avatar-placeholder">
                                    <div class="bg-primary text-neutral-content w-10 rounded-full">
                                        <span>{user.display_name.charAt(0).toUpperCase()}</span>
                                    </div>
                                </div>
                                <span className="text-sm font-medium">Admin</span>
                            </div>
                        </div>
                    )
                ) : (
                    <button type="button" onClick={() => globalThis.location.href = 'http://localhost:8080/login'} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                )}
            </div>
        </div>
    );
}
