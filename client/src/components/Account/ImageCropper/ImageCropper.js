import React, { useRef, forwardRef, useImperativeHandle} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./ImageCropper.css";
import { toast } from "react-toastify";

export const ImageCropper = forwardRef(({ userData,setUserData },ref) => {
    
 
    const cropperRef = useRef(null);
    useImperativeHandle(ref, () => ({
        async getCropData(){
            if (typeof cropperRef.current?.cropper !== "undefined") {

                const blobPromise = new Promise((resolve) => {
                    cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
                        resolve(blob);
                    }, userData.photo.type);
                });

                try {
                    const blobData = await blobPromise;
                    const file = new File([blobData], userData.photo.name, { type: userData.photo.type });
                    setUserData(() => {
                        return {
                            ...userData,
                            croppedPhoto: file
                        }
                    })
                   

                    // await setAsyncState({...userData,croppedData:file});
                    // await setSyncUserData({ ...userData, croppedData: file })
                } catch (err) {
                    toast.error(err.message);
                }
            }
        }
    }));

   
    return (
        <div>
            <div style={{ width: "100%" }}>
                <Cropper
                    style={{ height: "100%", width: 400 }}
                    initialAspectRatio={1}
                    aspectRatio={1}
                    preview=".img-preview"
                    src={URL.createObjectURL(userData.photo)}
                    ref={cropperRef}
                    viewMode={1}
                    guides={true}
                    zoomable={false}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                />
            </div>
           
        </div>
    );
});

export default ImageCropper;
