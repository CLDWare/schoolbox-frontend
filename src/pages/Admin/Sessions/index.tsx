export function Sessions() {
    return (
        <div class="hero bg-base-200 min-h-screen">
            <div class="hero-content text-center">
                <div class="max-w-md">
                <h1 class="text-5xl font-bold">All Sessions</h1>
                <p class="py-6">
                    Deze page is alleen te bezoeken als admin, de role check is client side dus niet veilig, maar de backend checkt de role dus het hoeft hier ook niet veilig te zijn.
                </p>
                </div>
            </div>
        </div>
    );
}