
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/admin" | "/admin/active" | "/admin/disputes" | "/admin/events" | "/admin/jastiper" | "/admin/negotiations" | "/admin/notifications" | "/admin/orders" | "/admin/orders/[code]" | "/admin/pending" | "/admin/posts" | "/admin/review" | "/admin/review/[code]" | "/admin/settings" | "/admin/shipping" | "/admin/transactions" | "/admin/users" | "/admin/users/[id]" | "/browse" | "/browse/[id]" | "/cart" | "/chats" | "/checkout" | "/checkout/[id]" | "/jastiper" | "/jastiper/chats" | "/jastiper/listings" | "/jastiper/listings/create" | "/jastiper/listings/[id]" | "/jastiper/listings/[id]/edit" | "/jastiper/orders" | "/jastiper/orders/[code]" | "/jastiper/profile" | "/jastiper/shipping" | "/jastiper/shipping/[id]" | "/jastiper/wallet" | "/login" | "/orders" | "/orders/[code]" | "/profile" | "/reviews" | "/review" | "/review/[orderCode]" | "/tracking" | "/wizard";
		RouteParams(): {
			"/admin/orders/[code]": { code: string };
			"/admin/review/[code]": { code: string };
			"/admin/users/[id]": { id: string };
			"/browse/[id]": { id: string };
			"/checkout/[id]": { id: string };
			"/jastiper/listings/[id]": { id: string };
			"/jastiper/listings/[id]/edit": { id: string };
			"/jastiper/orders/[code]": { code: string };
			"/jastiper/shipping/[id]": { id: string };
			"/orders/[code]": { code: string };
			"/review/[orderCode]": { orderCode: string }
		};
		LayoutParams(): {
			"/": { code?: string; id?: string; orderCode?: string };
			"/admin": { code?: string; id?: string };
			"/admin/active": Record<string, never>;
			"/admin/disputes": Record<string, never>;
			"/admin/events": Record<string, never>;
			"/admin/jastiper": Record<string, never>;
			"/admin/negotiations": Record<string, never>;
			"/admin/notifications": Record<string, never>;
			"/admin/orders": { code?: string };
			"/admin/orders/[code]": { code: string };
			"/admin/pending": Record<string, never>;
			"/admin/posts": Record<string, never>;
			"/admin/review": { code?: string };
			"/admin/review/[code]": { code: string };
			"/admin/settings": Record<string, never>;
			"/admin/shipping": Record<string, never>;
			"/admin/transactions": Record<string, never>;
			"/admin/users": { id?: string };
			"/admin/users/[id]": { id: string };
			"/browse": { id?: string };
			"/browse/[id]": { id: string };
			"/cart": Record<string, never>;
			"/chats": Record<string, never>;
			"/checkout": { id?: string };
			"/checkout/[id]": { id: string };
			"/jastiper": { id?: string; code?: string };
			"/jastiper/chats": Record<string, never>;
			"/jastiper/listings": { id?: string };
			"/jastiper/listings/create": Record<string, never>;
			"/jastiper/listings/[id]": { id: string };
			"/jastiper/listings/[id]/edit": { id: string };
			"/jastiper/orders": { code?: string };
			"/jastiper/orders/[code]": { code: string };
			"/jastiper/profile": Record<string, never>;
			"/jastiper/shipping": { id?: string };
			"/jastiper/shipping/[id]": { id: string };
			"/jastiper/wallet": Record<string, never>;
			"/login": Record<string, never>;
			"/orders": { code?: string };
			"/orders/[code]": { code: string };
			"/profile": Record<string, never>;
			"/reviews": Record<string, never>;
			"/review": { orderCode?: string };
			"/review/[orderCode]": { orderCode: string };
			"/tracking": Record<string, never>;
			"/wizard": Record<string, never>
		};
		Pathname(): "/" | "/admin" | "/admin/" | "/admin/active" | "/admin/active/" | "/admin/disputes" | "/admin/disputes/" | "/admin/events" | "/admin/events/" | "/admin/jastiper" | "/admin/jastiper/" | "/admin/negotiations" | "/admin/negotiations/" | "/admin/notifications" | "/admin/notifications/" | "/admin/orders" | "/admin/orders/" | `/admin/orders/${string}` & {} | `/admin/orders/${string}/` & {} | "/admin/pending" | "/admin/pending/" | "/admin/posts" | "/admin/posts/" | "/admin/review" | "/admin/review/" | `/admin/review/${string}` & {} | `/admin/review/${string}/` & {} | "/admin/settings" | "/admin/settings/" | "/admin/shipping" | "/admin/shipping/" | "/admin/transactions" | "/admin/transactions/" | "/admin/users" | "/admin/users/" | `/admin/users/${string}` & {} | `/admin/users/${string}/` & {} | "/browse" | "/browse/" | `/browse/${string}` & {} | `/browse/${string}/` & {} | "/cart" | "/cart/" | "/chats" | "/chats/" | "/checkout" | "/checkout/" | `/checkout/${string}` & {} | `/checkout/${string}/` & {} | "/jastiper" | "/jastiper/" | "/jastiper/chats" | "/jastiper/chats/" | "/jastiper/listings" | "/jastiper/listings/" | "/jastiper/listings/create" | "/jastiper/listings/create/" | `/jastiper/listings/${string}` & {} | `/jastiper/listings/${string}/` & {} | `/jastiper/listings/${string}/edit` & {} | `/jastiper/listings/${string}/edit/` & {} | "/jastiper/orders" | "/jastiper/orders/" | `/jastiper/orders/${string}` & {} | `/jastiper/orders/${string}/` & {} | "/jastiper/profile" | "/jastiper/profile/" | "/jastiper/shipping" | "/jastiper/shipping/" | `/jastiper/shipping/${string}` & {} | `/jastiper/shipping/${string}/` & {} | "/jastiper/wallet" | "/jastiper/wallet/" | "/login" | "/login/" | "/orders" | "/orders/" | `/orders/${string}` & {} | `/orders/${string}/` & {} | "/profile" | "/profile/" | "/reviews" | "/reviews/" | "/review" | "/review/" | `/review/${string}` & {} | `/review/${string}/` & {} | "/tracking" | "/tracking/" | "/wizard" | "/wizard/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/logo.svg" | string & {};
	}
}