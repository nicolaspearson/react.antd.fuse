import { action } from 'mobx';
import * as React from 'react';
import { Params, Route, State } from 'router5/create-router';

import App from 'containers/App';
import Dashboard from 'containers/DashboardLayout';
import { RouteNames } from 'enums/RouteNames';
import { RouterStore } from 'store/RouterStore';

export interface LinkData {
	name: string;
	params?: object;
}

export interface AdvRoute extends Route {
	link: (...args: any[]) => LinkData;
	component: (next?: Params) => any;
	activate?: (store: RouterStore, current?: Params, prev?: State) => void;
	deactivate?: (store: RouterStore, current?: Params, next?: State) => void;
}

export interface Routes {
	[name: string]: AdvRoute;
}

export const routes: Routes = {};

export const AppRoute: AdvRoute = {
	name: RouteNames.HOME,
	path: '/',

	link: () => ({
		name: AppRoute.name
	}),

	component: () => <App />,

	activate: action((store: RouterStore) => {
		store.activatedRouteName(AppRoute.name);
	}),

	deactivate: (store: RouterStore) => {
		store.deActivatedRouteName(AppRoute.name);
	}
};
routes[AppRoute.name] = AppRoute;

export const DashboardRoute: AdvRoute = {
	name: RouteNames.DASHBOARD,
	path: '/dashboard',

	link: () => ({
		name: DashboardRoute.name
	}),

	component: () => <Dashboard />,

	activate: action((store: RouterStore) => {
		store.activatedRouteName(DashboardRoute.name);
	}),

	deactivate: (store: RouterStore) => {
		store.deActivatedRouteName(DashboardRoute.name);
	}
};
routes[DashboardRoute.name] = DashboardRoute;

export const DashboardCalendarRoute: AdvRoute = {
	name: RouteNames.DASHBOARD_CALENDAR,
	path: '/dashboard/calendar',

	link: () => ({
		name: DashboardCalendarRoute.name
	}),

	component: () => <Dashboard />,

	activate: action((store: RouterStore) => {
		store.activatedRouteName(DashboardCalendarRoute.name);
	}),

	deactivate: (store: RouterStore) => {
		store.deActivatedRouteName(DashboardCalendarRoute.name);
	}
};
routes[DashboardCalendarRoute.name] = DashboardCalendarRoute;

export const DashboardOverviewRoute: AdvRoute = {
	name: RouteNames.DASHBOARD_OVERVIEW,
	path: '/dashboard/overview',

	link: () => ({
		name: DashboardOverviewRoute.name
	}),

	component: () => <Dashboard />,

	activate: action((store: RouterStore) => {
		store.activatedRouteName(DashboardOverviewRoute.name);
	}),

	deactivate: (store: RouterStore) => {
		store.deActivatedRouteName(DashboardOverviewRoute.name);
	}
};
routes[DashboardOverviewRoute.name] = DashboardOverviewRoute;

export const DashboardThemeRoute: AdvRoute = {
	name: RouteNames.DASHBOARD_THEME,
	path: '/dashboard/theme',

	link: () => ({
		name: DashboardThemeRoute.name
	}),

	component: () => <Dashboard />,

	activate: action((store: RouterStore) => {
		store.activatedRouteName(DashboardThemeRoute.name);
	}),

	deactivate: (store: RouterStore) => {
		store.deActivatedRouteName(DashboardThemeRoute.name);
	}
};
routes[DashboardThemeRoute.name] = DashboardThemeRoute;
