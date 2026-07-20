package com.taskmanager.repository;

import com.taskmanager.entity.Task;
import com.taskmanager.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // All tasks for a user
    List<Task> findByUserIdOrderByIdDesc(Long userId);

    // All tasks for a user filtered by status
    List<Task> findByUserIdAndStatusOrderByIdDesc(Long userId, TaskStatus status);

    // Ownership-safe single-task lookup: only returns the task if it belongs to userId
    Optional<Task> findByIdAndUserId(Long id, Long userId);
}
