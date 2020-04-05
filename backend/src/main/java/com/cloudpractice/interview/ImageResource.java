package com.cloudpractice.interview;

import javax.imageio.ImageIO;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Base64;

import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name = "image")
@Path("/image")
public class ImageResource {
    private static final Logger logger = LoggerFactory.getLogger(InterviewApplication.class);

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response createImage(
            @FormDataParam("file") InputStream file,
            @FormDataParam("file") FormDataContentDisposition fileMetaData,
            @FormDataParam("file") FormDataBodyPart body) throws IOException {

        logger.debug(fileMetaData.getFileName());
        logger.debug(body.getMediaType().toString());
        if (body.getMediaType().equals(new MediaType("image", "jpeg"))) {
            BufferedImage image = ImageIO.read(file);
            int width = image.getWidth();
            int height = image.getHeight();

            // Convert to greyscale
            for(int y = 0; y < height; y++){
                for(int x = 0; x < width; x++){
                    // Loop through each pixel and get ARGB values
                    int pixel = image.getRGB(x, y);
                    int a = (pixel>>24)&0xff;
                    int r = (pixel>>16)&0xff;
                    int g = (pixel>>8)&0xff;
                    int b = pixel&0xff;

                    // Replace RGB value with average for each pixel
                    int average = (r+g+b)/3;
                    pixel = (a<<24) | (average<<16) | (average<<8) | average;
                    image.setRGB(x, y, pixel);
                }
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "jpg", baos);
            byte[] imageData = baos.toByteArray();
            String base64ImageData = Base64.getEncoder().encodeToString(imageData);
            return Response.ok("data:image/jpeg;base64," + base64ImageData).build();
        } else {
            return Response.status(415).entity("image/jpeg is required").build();
        }
    }
}