import { PropsWithChildren } from "react";

export const Map = ({ children }: PropsWithChildren) => {
    return (
        <div data-testid="map" >
            {children}
        </div>
    );
};

export const FullscreenControl = () => <div data-testid="fullscreen-control" />;
export const NavigationControl = () => <div data-testid="navigation-control" />;
export const ScaleControl = () => <div data-testid="scale-control" />;
export const Popup = ({ children }: PropsWithChildren) => <div data-testid="popup">{children}</div>;
