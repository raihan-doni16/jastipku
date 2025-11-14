export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34'),
	() => import('./nodes/35'),
	() => import('./nodes/36'),
	() => import('./nodes/37'),
	() => import('./nodes/38'),
	() => import('./nodes/39'),
	() => import('./nodes/40'),
	() => import('./nodes/41'),
	() => import('./nodes/42'),
	() => import('./nodes/43')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/admin": [4,[2]],
		"/admin/active": [5,[2]],
		"/admin/disputes": [6,[2]],
		"/admin/events": [7,[2]],
		"/admin/jastiper": [8,[2]],
		"/admin/negotiations": [9,[2]],
		"/admin/notifications": [10,[2]],
		"/admin/orders/[code]": [~11,[2]],
		"/admin/pending": [12,[2]],
		"/admin/posts": [13,[2]],
		"/admin/review/[code]": [14,[2]],
		"/admin/settings": [15,[2]],
		"/admin/shipping": [16,[2]],
		"/admin/transactions": [17,[2]],
		"/admin/users": [18,[2]],
		"/admin/users/[id]": [19,[2]],
		"/browse": [20],
		"/browse/[id]": [21],
		"/cart": [22],
		"/chats": [23],
		"/checkout": [24],
		"/checkout/[id]": [25],
		"/jastiper": [26],
		"/jastiper/chats": [27],
		"/jastiper/listings": [28],
		"/jastiper/listings/create": [30],
		"/jastiper/listings/[id]/edit": [29],
		"/jastiper/orders": [31],
		"/jastiper/orders/[code]": [~32],
		"/jastiper/profile": [33],
		"/jastiper/shipping/[id]": [34],
		"/jastiper/wallet": [35],
		"/login": [36],
		"/orders": [37],
		"/orders/[code]": [38],
		"/profile": [39],
		"/reviews": [41],
		"/review/[orderCode]": [40],
		"/tracking": [42],
		"/wizard": [43]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';