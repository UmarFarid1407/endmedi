import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  Button,
  Badge,
  Avatar,
  Typography,
  Box,
  Card,
} from "../../../../../../sharedimports/share";
import FileUploadEdit from "./ImageShowWithUserID";

const styles = {
  details: {
    padding: "1rem",
    borderTop: "1px solid #e1e1e1",
  },
  value: {
    padding: "1rem 2rem",
    borderTop: "1px solid #e1e1e1",
    color: "#899499",
  },
};

export default function ProfileCard(props: any) {
  return (
    <Card variant="outlined">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          {/* PROFILE PHOTO */}
          
          {/* <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <PhotoCameraIcon
                sx={{
                  border: "5px solid white",
                  backgroundColor: "#ff558f",
                  borderRadius: "50%",
                  padding: ".2rem",
                  width: 35,
                  height: 35,
                }}
              ></PhotoCameraIcon>
            }
          > */}
           <FileUploadEdit/>
            
          {/* </Badge> */}

          <Typography variant="h6">{props.name}</Typography>
          <Typography color="text.secondary">{props.sub}</Typography>
        </Box>

        <Box display="flex" width="100%">
          <Box width="100%">
            <Typography style={styles.details}>User</Typography>
            <Typography style={styles.details}>User ID</Typography>

            <Typography style={styles.details}>UserEmail</Typography>
            <Typography style={styles.details}>Role</Typography>
          </Box>

          <Box width="100%" textAlign="end">
            <Typography style={styles.value}>MedibridgeUser</Typography>
            <Typography style={styles.value}>{props.USERID}</Typography>

            <Typography style={styles.value}>{props.USEREMAIL}</Typography>
            <Typography style={styles.value}>{props.USERROLE}</Typography>
          </Box>
        </Box>

        <Box sx={{ width: "100%" }} style={styles.details}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "99%", p: 1, my: 2 }}
          >
            Your Public Profile
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
