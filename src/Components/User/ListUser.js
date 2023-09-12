import React, { useState } from 'react'
import UserService from '../../Services/UserService';
import Select from "react-select";
import { DataTable } from '../../Common/DataTable';
import { ConfirmAlert } from '../../Utils/ConfirmAlert';
import { Loading } from '../../Utils/Loading';
import { Alertinfo, Alertsuccess, Alertwarning } from '../../Utils/Notification';

export const ListUser = () => {

    const [users, setUsers] = useState([]);
    const [titleModal, setTitleModal] = useState('Add new user');
    const [effect, setEffect] = useState({
        onLoad: false
    });

    const [searchUser, setSearchUser] = useState({
        searchId: '',
        searchUsername: '',
    })
    const [formValue, setFormValue] = useState({
        valueUserId: '',
        valueUsername: '',
    })

    const [searchRole, setSearchRole] = useState({ value: 0, label: 'Select' });
    const [formRole, setFormRole] = useState({ value: 3, label: 'Member' });
    const optionSelect1 = [
        { value: 0, label: 'Select' },
        { value: 1, label: 'Admin' },
        { value: 2, label: 'Manager' },
        { value: 3, label: 'Member' },
    ];

    const optionSelect2 = [
        { value: 1, label: 'Admin' },
        { value: 2, label: 'Manager' },
        { value: 3, label: 'Member' },
    ];

    const handleClearSearch = () => {
        setSearchUser({
            searchId: '',
            searchUsername: '',
        })
        setSearchRole({ value: 0, label: 'Select' })
    }

    const handleClearForm = () => {
        setFormValue({
            valueUserId: '',
            valueUsername: '',
        })
        setFormRole({ value: 3, label: 'Member' })
        setTitleModal('Add new user')
    }


    const handleAddUpdateUser = () => {
        if (formValue.valueUserId) {
            handleUpdateUser()
        } else {
            handleAddUser()
        }
    }

    const handleSearch = () => {
        setEffect({ ...effect, onLoad: true })
        try {
            const searchParams = {};
            if (searchUser.searchId) {
                searchParams.id = searchUser.searchId;
            }
            if (searchUser.searchUsername) {
                searchParams.username = searchUser.searchUsername;
            }
            if (searchRole.value !== 0) {
                searchParams.role = searchRole;
            }
            console.log(searchParams);
            UserService.searchUsers(searchParams)
                .then((data) => {
                    console.log(data);
                    setUsers(data);
                    setEffect({ ...effect, onLoad: false })
                    if (data.length === 0) {
                        Alertinfo('No data')
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data: ', error);
                    setEffect({ ...effect, onLoad: false })
                    Alertinfo('Error data')
                });
        } catch (error) {
            console.log(error);
            setEffect({ ...effect, onLoad: false })
        }
    };

    const handleAddUser = () => {
        setEffect({ ...effect, onLoad: true })
        try {
            if (formValue.valueUsername === '') {
                Alertwarning('Please import Username')
                setEffect({ ...effect, onLoad: false })
                return
            }
            const pr = {
                username: formValue.valueUsername,
                role: formRole
            }
            UserService.addUser(pr)
                .then((data) => {
                    Alertsuccess('Add user success')
                    setEffect({ ...effect, onLoad: false })
                    handleClearForm()
                })
                .catch((error) => {
                    console.error('Error add data: ', error);
                    setEffect({ ...effect, onLoad: false })
                });
        } catch (error) {
            console.log(error);
            setEffect({ ...effect, onLoad: false })
        }
    }

    const handleUpdateUser = () => {
        setEffect({ ...effect, onLoad: true })
        try {
            if (formValue.valueUsername === '') {
                Alertwarning('Please import Username')
            }
            const pr = {
                username: formValue.valueUsername,
                role: formRole
            }
            UserService.updateUser(formValue.valueUserId, pr)
                .then((data) => {
                    users.map(e => {
                        if (e.id === formValue.valueUserId) {
                            e.valueUserId = formValue.valueUserId;
                            e.username = formValue.valueUsername;
                            e.role = formRole;
                        }
                        return e;
                    })
                    setTitleModal(`Edit user: ${formValue.valueUsername}`)
                    Alertsuccess('Update user success')
                    setEffect({ ...effect, onLoad: false })
                })
                .catch((error) => {
                    console.error('Error add data: ', error);
                    setEffect({ ...effect, onLoad: false })
                });
        } catch (error) {
            console.log(error);
            setEffect({ ...effect, onLoad: false })
        }
    }

    const handleDeleteUser = (item) => {
        try {
            ConfirmAlert("Are you sure delete!", async () => {
                setEffect({ ...effect, onLoad: true })
                UserService.deleteUser(item.id)
                    .then(() => {
                        setUsers(users.filter((user) => user.id !== item.id));
                        Alertsuccess('Delete success')
                        setEffect({ ...effect, onLoad: false })
                    })
                    .catch((error) => {
                        console.error('Error deleting user: ', error);
                        Alertwarning('Delete error')
                        setEffect({ ...effect, onLoad: false })
                    });
            })
        } catch (error) {
            console.log(error);
        }
    }


    const handleEditUser = (item) => {
        const dataRow = item._original
        setTitleModal(`Edit user: ${dataRow.username}`)
        try {
            setFormValue({
                valueUserId: dataRow.id,
                valueUsername: dataRow.username
            })
            setFormRole(dataRow.role)
            console.log(formValue);
        } catch (error) {
            console.log(error);
            setEffect({ ...effect, onLoad: false })
        }
    }


    const columns = [
        {
            Header: "Option",
            Cell: ({ row }) => (
                <span className='f-center'>
                    <button
                        className="btn btn-outline-primary btn-sm mr-3"
                        data-toggle="modal" data-target="#modal-xl"
                        onClick={() => handleEditUser(row)}
                    >
                        <i className="fa fa-edit" /> Edit
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteUser(row._original)}
                    >
                        <i className="fa fa-trash" /> Delete
                    </button>
                </span>
            ),
            width: 200,
            filterable: false,
        },
        {
            Header: "User Id",
            accessor: "id",
            width: 300,
        },
        {
            Header: "Username",
            accessor: "username",
        },
        {
            Header: "Role",
            accessor: "role",
            Cell: ({ row }) => {
                return (
                    <div> {row._original.role.label}</div>
                );
            },
        },

    ];

    return (
        <div className="content-wrapper">
            <section className="content mt-3">
                <div className="container-fluid">
                    <Loading onLoad={effect.onLoad} />
                    <div className='row'>
                        <section className="col-12">
                            <div className="card card-info  card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fas fa-users mr-2" />
                                        List User
                                    </h3>
                                    <div className="card-tools">
                                        <button
                                            type="button"
                                            class="btn btn-outline-danger btn-sm mr-2"
                                            onClick={handleClearSearch}
                                        >
                                            <i class="fas fa-ban mr-1"></i>Clear
                                        </button>
                                        <button type="button"
                                            class="btn btn-success btn-sm"
                                            data-toggle="modal"
                                            data-target="#modal-xl"
                                            onClick={() => {
                                                handleClearForm()
                                            }}
                                        >
                                            <i class="fas fa-user-plus mr-1"></i>Add User
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content p-0">
                                        <div className='row'>
                                            <div class="form-group col-md-4">
                                                <label >User Id</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    value={searchUser.searchId}
                                                    onChange={(e) => setSearchUser({ ...searchUser, searchId: e.target.value })}
                                                />
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label >Username</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    value={searchUser.searchUsername}
                                                    onChange={(e) => setSearchUser({ ...searchUser, searchUsername: e.target.value })}
                                                />
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label>Role</label>
                                                <Select
                                                    onChange={e => setSearchRole(e)}
                                                    value={searchRole}
                                                    options={optionSelect1}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center mt-2'>
                                        <button type="button" class="btn bg-info btn-sm" onClick={handleSearch}> <i class="fas fa-search mr-1" />Search</button>
                                    </div>
                                </div>
                                {users.length > 0 &&
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <DataTable data={users} columns={columns} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </section>
                    </div>
                    <div class="modal fade" id="modal-xl">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">{titleModal}</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div className='row'>
                                        <div class="form-group col-md-6">
                                            <label >Username</label> <span className='label-red'>*</span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                value={formValue.valueUsername}
                                                onChange={(e) => setFormValue({ ...formValue, valueUsername: e.target.value })}
                                            />
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Role</label> <span className='label-red'>*</span>
                                            <Select
                                                onChange={e => setFormRole(e)}
                                                value={formRole}
                                                options={optionSelect2}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer justify-content-center">
                                    <button type="button" class="btn btn-success" onClick={handleAddUpdateUser}><i class="far fa-save mr-2"></i>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

