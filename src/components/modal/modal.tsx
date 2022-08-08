/* eslint-disable react/jsx-no-undef */
import React, { FC, useRef, useEffect } from "react";
import cn from 'classnames'
import Portal from "@reach/portal";
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks,
} from "body-scroll-lock"
import { IoClose } from "react-icons/io5"
import useOnClickOutside from "../../utils/use-click-outside";

type ModalProps = {
	open?: boolean;
	children?: React.ReactNode;
	onClose: () => void;
	variant?: "center" | "bottom";
};
type DivElementRef = React.MutableRefObject<HTMLDivElement>;


const rootClasses = {
	center: "p-4 md:p-5",
	bottom: "p-5 pb-0",
};
const containerClasses = {
	center: "h-auto max-h-full top-1/2 -translate-y-1/2 rounded-md",
	bottom: "h-full max-h-70vh bottom-0 rounded-ts-2xl rounded-te-2xl",
};
const closeBtnClasses = {
	center: "top-4 end-4",
	bottom: "top-1/4 start-1/2 transform -translate-y-1/2 -translate-x-1/2",
};

const Modal:FC<ModalProps> = ({
    open,
    children,
    onClose,
    variant="center"
}) => {

    const modalRootRef = useRef() as DivElementRef;
	const modalInnerRef = useRef() as DivElementRef;
	
	useOnClickOutside(modalInnerRef, () => onClose());
	useEffect(() => {
		if (modalInnerRef.current) {
			if (open) {
				disableBodyScroll(modalInnerRef.current);
			} else {
				enableBodyScroll(modalInnerRef.current);
			}
		}
		return () => {
			clearAllBodyScrollLocks();
		};
	}, [open]);
    
    return (
        <Portal>
            	{open && (
					<div
						ref={modalRootRef}
						key="modal"
						className={cn(
							"modal-root fixed bg-black bg-opacity-70 inset-0 z-[1010]",
							rootClasses[variant],
							
						)}
					>
						<button
							onClick={onClose}
							aria-label="Close panel"
							className={cn(
								"fixed z-10 inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-white shadow text-gray-600 transition duration-200 focus:outline-none focus:text-gray-800 focus:shadow-md hover:text-gray-800 hover:shadow-md",
								closeBtnClasses[variant]
							)}
						>
							<IoClose className="text-xl" />
						</button>
						<div
							
							className="relative h-full mx-auto w-full"
						>
							<div
								className={cn(
									"w-full flex justify-center md:w-auto absolute left-1/2 transform -translate-x-1/2 shadow-xl",
									containerClasses[variant],
									
								)}
							>
								<div
									ref={modalInnerRef}
									className="overflow-y-auto bg-white h-full rounded-md w-64 md:w-[530px]"
									style={{ maxHeight: "calc(100vh - 140px)" }}
								>
									<div className="w-full md:w-[95%] px-4 md:px-2 mx-auto">
                                        {children}
                                    </div>
								</div>
							</div>
						</div>
					</div>
				)}
        </Portal>
    )
}

export default Modal
