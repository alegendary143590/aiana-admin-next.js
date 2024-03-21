import { Grid, Typography, Input, Divider, Button, MenuItem, FormControl } from "@mui/material"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import languages from "@/components/languages"
import Form from "@/shared/Form"
import * as React from "react"
import countries from "../../country"
import { validation } from "./validation"

const Profile = () => {
   
    const [country, setCountry] = React.useState("")
    const [language, setLanugage] = React.useState("")

    const handleCountryChange = (event: SelectChangeEvent) => {
        setCountry(event.target.value as string);
    }
    const handleLanguageChange = (event: SelectChangeEvent) => {
        setLanugage(event.target.value as string);
    }
    const handleSubmit = () => {

    }

    return (
        <Form
            onSubmit={handleSubmit}
            validationSchema={validation}
        >
            <Grid container spacing={1} className="bg-[#e6f2ff] h-full w-full rounded-[10px] m-0 py-[20px] px-[30px]">
                <Grid className="w-full">
                    <Typography variant="body1" className="text-[24px] h-[50px]"> My Profile</Typography>
                    <Grid container direction="row" spacing={3} className="w-full rounded-[10px] mt-1" alignItems="center">
                        <Grid item xs={2}>
                            <Typography align="left">Name:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Input className="w-full"></Input>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={3} className="w-full rounded-[10px] mt-1" alignItems="center">
                        <Grid item xs={2}>
                            <Typography variant="body1" alignItems="center" align="left">VAR number:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Input className="w-full"></Input>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={3} className="w-full rounded-[10px] mt-1" alignItems="center">
                        <Grid item xs={2}>
                            <Typography variant="body1" align="left">Street:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Input className="w-full"></Input>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body1" align="right">Number:</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Input className="w-full"></Input>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={3} className="w-full rounded-[10px] mt-1" alignItems="center">
                        <Grid item xs={2}>
                            <Typography variant="body1" align="left">Postal code:</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Input className="w-full"></Input>
                        </Grid>
                        <Grid item xs={1} alignItems="end" className="ml-5">
                            <Typography variant="body1" justifyContent="end" className="flex items-center">City:</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Input className="w-full"></Input>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={3} className="w-full rounded-[10px] mt-1" alignItems="center">
                        <Grid item xs={2}>
                            <Typography variant="body1" alignItems="center" align="left">Country:</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Select
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200, // Adjust the height as needed
                                        },
                                    },
                                }}
                                displayEmpty
                                className="bg-white h-[45px]"
                                value={country}
                                onChange={handleCountryChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem disabled value="">
                                    <em>Select a country</em>
                                </MenuItem>
                                {countries.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body1" alignItems="center" align="right">Language:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200, // Adjust the height as needed
                                        },
                                    },
                                }}
                                displayEmpty
                                className="bg-white h-[45px]"
                                value={language}
                                onChange={handleLanguageChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem disabled value="">
                                    <em>Select a language</em>
                                </MenuItem>
                                {languages.map((name) => (
                                    <MenuItem
                                        key={name.code}
                                        value={name.name}
                                    >
                                        {name.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={3} className="w-full rounded-[10px] mt-1" alignItems="center">
                        <Grid item xs={2}>
                            <Typography variant="body1" alignItems="center" align="left">Website:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Input className="w-full"></Input>
                        </Grid>
                    </Grid>
                    <Divider className="bg-white mt-8"></Divider>
                    <Typography variant="body1" className="text-[24px] h-[50px] mt-3"> My Account</Typography>
                    <Grid container direction="row" spacing={3} className="w-full rounded-[10px]" alignItems="center">
                        <Grid item xs={2}>
                            <Typography variant="body1" align="left">First Name:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Input className="w-full"></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" justifyContent="end" className="flex items-center">Last Name:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Input className="w-full"></Input>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={3} className="w-full rounded-[10px] mt-1" alignItems="center">
                        <Grid item xs={2}>
                            <Typography variant="body1" alignItems="center" align="left">Email:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Input className="w-full"></Input>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={3} className="w-full rounded-[10px] mt-1" alignItems="center">
                        <Grid item xs={2}>
                            <Typography variant="body1" align="left">Password:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Input id="password" name="password" type="password" className="w-full"></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" justifyContent="end" className="flex items-center">Confirm Password:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Input type="password" className="w-full"></Input>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} alignItems="center" className="flex items-center justify-center">
                    <Button className="mt-3 bg-[#0099ff] w-[200px] text-white" variant="contained" onClick={handleSubmit}>
                        Save
                    </Button>
                </Grid>

            </Grid>
        </Form>
    )
}

export default Profile
